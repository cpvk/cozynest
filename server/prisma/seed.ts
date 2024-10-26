import prisma from '../src/lib/prisma';

// Local-dev seed only: images are served by the Vite client from
// client/public/products/, so seeded rows point at the client origin.
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const products = [
  {
    product_name: 'Dining Table Set',
    description: 'Solid wood dining table with seating for six.',
    price: 45999,
    stock_quantity: 8,
    category: 'dining room',
    type: 'table',
    image_url: `${CLIENT_URL}/products/dining.jpg`,
  },
  {
    product_name: 'Living Room Sofa',
    description: 'Three-seater fabric sofa with deep cushions.',
    price: 62999,
    stock_quantity: 5,
    category: 'living room',
    type: 'sofa',
    image_url: `${CLIENT_URL}/products/living.jpg`,
  },
  {
    product_name: 'Bedroom Bed Frame',
    description: 'Queen-size bed frame in a warm wood finish.',
    price: 54999,
    stock_quantity: 4,
    category: 'bedroom',
    type: 'bed',
    image_url: `${CLIENT_URL}/products/bedroom.jpg`,
  },
  {
    product_name: 'New Collection Chair',
    description: 'Accent chair from the new CozyNest collection.',
    price: 18999,
    stock_quantity: 12,
    category: 'living room',
    type: 'chair',
    image_url: `${CLIENT_URL}/products/collection.jpg`,
  },
];

async function main() {
  const existing = await prisma.product.count();
  if (existing > 0) {
    console.log(`Seed skipped: ${existing} product(s) already exist.`);
    return;
  }
  await prisma.product.createMany({ data: products });
  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
