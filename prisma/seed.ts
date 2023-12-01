import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });

  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {
      userId: user1.id,
    },
    create: {
      title: 'Prisma Adds Support for MongoDB',
      body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: "What's new in Prisma? (Q1/22)" },
    update: {
      userId: user2.id,
    },
    create: {
      title: "What's new in Prisma? (Q1/22)",
      body: 'Our engineers have been working hard, issuing new releases with many improvements...',
      description:
        'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
      published: true,
    },
  });

  const category1 = await prisma.category.upsert({
    where: { title: 'Lorem ipsum dolor sit amet' },
    update: {},
    create: {
      title: 'Camera',
      description:
        'consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
    },
  });

  const category2 = await prisma.category.upsert({
    where: { title: 'Cursus euismod quis viverra' },
    update: {},
    create: {
      title: 'Phone',
      description:
        'Ac tincidunt vitae semper quis lectus nulla at volutpat. Nisl condimentum id venenatis a condimentum',
    },
  });

  const product1 = await prisma.product.upsert({
    where: { title: 'Dui ut ornare lectus sit amet' },
    update: {
      categoryId: category1.id,
    },
    create: {
      title: 'Dui ut ornare lectus sit amet',
      description:
        'Est pellentesque elit ullamcorper dignissim cras tincidunt. Risus commodo viverra maecenas accumsan',
      price: 3000,
      discount_price: 2000,
      state: 'Available',
      slug: '',
    },
  });

  const product2 = await prisma.product.upsert({
    where: { title: 'Enim praesent elementum' },
    update: {
      categoryId: category2.id,
    },
    create: {
      title: 'Enim praesent elementum',
      description:
        'Imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis',
      price: 5000,
      discount_price: 3000,
      state: 'Out of stock',
      slug: '',
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
