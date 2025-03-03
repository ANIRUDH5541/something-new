export type CrochetItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  details: string;
  isNew?: boolean;
};

export const crochetItems: CrochetItem[] = [
  {
    id: "1",
    name: "Cozy Blanket",
    description: "A warm and soft blanket perfect for chilly evenings",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1580301762395-83dcf0c06062?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "This handmade blanket is crafted with premium acrylic yarn, making it both durable and soft. The intricate stitch pattern adds texture and visual interest, while the generous size (50\" x 60\") provides ample coverage for cozy nights on the couch."
  },
  {
    id: "2",
    name: "Amigurumi Bear",
    description: "Adorable handcrafted teddy bear for all ages",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1535722339661-a55af3b4b2d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "This charming amigurumi bear stands 8 inches tall and is made with 100% cotton yarn. Each bear is lovingly handcrafted with attention to detail, from the carefully embroidered facial features to the tiny paw pads. A perfect gift for children or collectors alike."
  },
  {
    id: "3",
    name: "Beanie Hat",
    description: "Stylish and warm beanie for cold weather",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "Stay warm in style with this handcrafted beanie hat. Made with a wool-blend yarn for maximum warmth and comfort, this hat features a ribbed texture and a slight slouch for a modern look. One size fits most adults."
  },
  {
    id: "4",
    name: "Plant Hanger",
    description: "Macramé-style plant hanger for your green friends",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "Add a touch of bohemian charm to your home with this handcrafted plant hanger. Made with 100% cotton cord, this macramé-style hanger features an intricate pattern that will showcase your favorite potted plants. Suitable for pots up to 8 inches in diameter."
  },
  {
    id: "5",
    name: "Coasters Set",
    description: "Set of 4 colorful coasters to protect your surfaces",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1584346133934-a3a4db9b5ddd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "Protect your surfaces in style with this set of 4 handcrafted coasters. Each coaster is made with cotton yarn in complementary colors and measures 4 inches in diameter. The tight stitch pattern creates a durable and absorbent surface, perfect for hot or cold beverages."
  },
  {
    id: "6",
    name: "Market Bag",
    description: "Eco-friendly and stylish shopping bag",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1591824438708-ce405f36ba3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: "This handcrafted market bag is both stylish and eco-friendly. Made with durable cotton yarn, it features an expandable design that can hold all your shopping essentials. The open-work pattern adds visual interest while the reinforced handles ensure durability. Measures approximately 14\" x 16\" when flat."
  }
];