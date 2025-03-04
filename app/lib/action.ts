import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "./hooks";
import prisma from "./db";
import nodemailer from "nodemailer";
import { Decimal } from "@prisma/client/runtime/library";

const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.EMAIL_PASSWORD,
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

export async function Products(req: NextRequest) {
    const user = await getAuthenticatedUser();
    if (!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        const products = await prisma.product.findMany({
            orderBy: { id: "asc" },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json(
            { message: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

export async function POST_purchase(req: NextRequest) {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const { items } = await req.json();
      if (!items || !Array.isArray(items) || items.length === 0) {
        throw new Error("Invalid items array");
      }
  
      const products = await prisma.product.findMany({
        where: { id: { in: items.map((i) => i.id) } },
      });
  
      const orderItems = items.map((item) => {
        const product = products.find((p) => p.id === parseInt(item.id));
        if (!product) throw new Error(`Product ${item.id} not found`);
        if (product.count < item.quantity) {
          throw new Error(`Insufficient stock for ${product.name}`);
        }
        return {
          id: product.id,
          name: product.name,
          description: product.description,
          price: new Decimal(product.price), // Ensure Decimal type
          materials: Array.isArray(product.materials)
            ? product.materials
            : JSON.parse(product.materials as string),
          quantity: item.quantity,
          subtotal: new Decimal(product.price).mul(item.quantity),
        };
      });
  
      const total = orderItems.reduce((sum, item) => sum.add(item.subtotal), new Decimal(0));
  
      const newOrder = await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            userId: user.id,
            items: JSON.stringify(orderItems),
            total: total,
          },
        });
  
        for (const item of orderItems) {
          await tx.product.update({
            where: { id: item.id },
            data: { count: { decrement: item.quantity } },
          });
        }
  
        const mailOptions = {
          from: process.env.ADMIN_EMAIL,
          to: process.env.ADMIN_EMAIL,
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
                  ${item.name} - $${item.price} x ${item.quantity} = $${item.subtotal}<br>
                  Description: ${item.description}<br>
                  Materials: ${item.materials.join(", ")}
                </li>
              `
                )
                .join("")}
            </ul>
            <p>Total: $${total}</p>
          `,
        };
  
        await emailTransporter.sendMail(mailOptions);
        return order; // Return order object
      });
  
      return NextResponse.json({
        message: "Purchase completed successfully",
        order: {
          id: newOrder.id,
          items: orderItems,
          total,
          user: { email: user.email, name: user.name },
        },
      });
    } catch (error: any) {
      console.error("Error processing purchase:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
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

// POST /api/products/messages - Store a message (requires authentication)
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