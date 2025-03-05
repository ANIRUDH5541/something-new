import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "./hooks";
import prisma from "./db";
import nodemailer from "nodemailer";
import { Decimal, JsonValue } from "@prisma/client/runtime/library";
import { ProductTypes } from "../constants/type";

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

async function getAuthenticatedUser() {
  const session = await requireUser();
  if (!session?.user) {
    return null;
  }
  return session.user;
}

function isUserAdmin(user: { role: string } | null): boolean {
  return user?.role === "admin";
}

export async function Products() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        count: true,
        price: true,
        materials: true,
        image: true,
        createdAt: false,
      },
      orderBy: {
        id: "asc",
      },
    });
    const serializedProducts = products.map((product) => {
      let materials: JsonValue | null = product.materials;
      if (materials && typeof materials === "object" && !Array.isArray(materials)) {
        materials = { ...materials };
      }
      return {
        ...product,
        materials,
        price: product.price.toNumber(),
      };
    });

    console.log("Serialized products:", serializedProducts);
    return NextResponse.json(serializedProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

interface OrderItem {
  id: number;
  name: string;
  description: string;
  price: Decimal;
  materials: string[];
  quantity: number;
  subtotal: Decimal;
}

export async function POST_purchase(items: ProductTypes[]) {
  const user = await getAuthenticatedUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid items array");
    }

    // Fetch products from database
    const productIds = items.map((i) => i.id);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Transform and validate items
    const orderItems: OrderItem[] = items.map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product ${item.id} not found`);
      }
      if (product.count < item.count) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      // Handle materials
      const materials = item.materials
        ? [item.materials.material]
        : Array.isArray(product.materials)
          ? product.materials
          : product.materials
            ? JSON.parse(product.materials as string)
            : [];

      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: new Decimal(product.price),
        materials,
        quantity: item.count,
        subtotal: new Decimal(product.price).mul(item.count),
      };
    });

    const total = orderItems.reduce((sum, item) => sum.add(item.subtotal), new Decimal(0));

    const newOrder = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
          items: JSON.stringify(orderItems),
          total: total.toNumber(), // Convert to number for Prisma
        },
      });

      // Update stock
      for (const item of orderItems) {
        await tx.product.update({
          where: { id: item.id },
          data: { count: { decrement: item.quantity } },
        });
      }

      // Send email notification
      const mailOptions = {
        from: process.env.ADMIN_EMAIL as string,
        to: process.env.ADMIN_EMAIL as string,
        subject: `New Order from ${user.email}`,
        html: `
          <h2>New Order Details (#${order.id})</h2>
          <p>User: ${user.name} (${user.email})</p>
          <h3>Items:</h3>
          <ul>
            ${orderItems
            .map(
              (item) => `
                  <li>
                    ${item.name} - $${item.price.toNumber()} x ${item.quantity} = $${item.subtotal.toNumber()}<br>
                    Description: ${item.description}<br>
                    Materials: ${item.materials.join(", ")}
                  </li>
                `
            )
            .join("")}
          </ul>
          <p>Total: $${total.toNumber()}</p>
        `,
      };

      await emailTransporter.sendMail(mailOptions);
      return order;
    });


    return {
      message: "Purchase completed successfully",
      order: {
        id: newOrder.id,
        items: orderItems,
        total: total.toNumber(),
        user: { email: user.email, name: user.name },
      },
    };
  } catch (error: any) {
    console.error("Error processing purchase:", error);
    throw error; // Throw the error to be handled by the caller
  }
}

export async function GET_orders(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST_messages(req: NextRequest) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { content } = await req.json();
    if (!content || typeof content !== "string") {
      throw new Error("Invalid message content");
    }

    const message = await prisma.message.create({
      data: {
        userId: user.id as string,
        content,
      },
    });

    return NextResponse.json({
      message: "Message stored successfully",
      data: message,
    });
  } catch (error: any) {
    console.error("Error storing message:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}