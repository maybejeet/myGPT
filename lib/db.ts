import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

// Function to create a new PrismaClient instance
export function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
  return new PrismaClient({ adapter });
}

// Next.js compatibility: avoid hot-reload issues and edge serverless issues by using a global singleton
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  createPrismaClient();

// Attach to global object in development to prevent multiple instances during hot-reload
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}