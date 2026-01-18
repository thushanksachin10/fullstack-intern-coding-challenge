import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // hash password once
  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  // 1️⃣ Create Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@system.com" },
    update: {},
    create: {
      name: "System Administrator Account",
      email: "admin@system.com",
      password: hashedPassword,
      address: "System Admin Address",
      role: "ADMIN",
    },
  });

  // 2️⃣ Create Store Owner
  const ownerPassword = await bcrypt.hash("Owner@123", 10);

  const storeOwner = await prisma.user.upsert({
    where: { email: "owner@store.com" },
    update: {},
    create: {
      name: "Primary Store Owner Account",
      email: "owner@store.com",
      password: ownerPassword,
      address: "Store Owner Address",
      role: "STORE_OWNER",
    },
  });

  // 3️⃣ Create Store
  await prisma.store.upsert({
    where: { ownerId: storeOwner.id },
    update: {},
    create: {
      name: "Sample Grocery Store",
      email: "store@grocery.com",
      address: "123 Sample Street, City",
      ownerId: storeOwner.id,
    },
  });

  console.log("✅ Seed data inserted successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
