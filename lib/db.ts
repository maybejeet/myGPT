import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";



const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

/**
 * Creates a Prisma client backed by the PostgreSQL adapter.
 *
 * @throws {Error} When `DATABASE_URL` is not set.
 */
function createPrismaClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set");
  }

  
  const adapter = new PrismaPg({ connectionString: url });
  return new PrismaClient({ adapter });
}


/** Singleton Prisma client; reused in development to avoid hot-reload connection leaks. */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();


if(process.env.NODE_ENV !== "production"){
    globalForPrisma.prisma = prisma;
}

// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "./generated/prisma/client";

// // Function to create a new PrismaClient instance
// export function createPrismaClient() {
//   const adapter = new PrismaPg({
//     connectionString: process.env.DATABASE_URL,
//   });
//   return new PrismaClient({ adapter });
// }

// // Next.js compatibility: avoid hot-reload issues and edge serverless issues by using a global singleton
// const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient | undefined};

// export const prisma =
//   globalForPrisma.prisma ||
//   createPrismaClient();

// // Attach to global object in development to prevent multiple instances during hot-reload
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }