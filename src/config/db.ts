import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";
import dotenv from "dotenv";

dotenv.config();
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaNeon(pool);
const prisma = new PrismaClient({ adapter });

async function connectDb() {
  try {
    await prisma.$connect();
    console.log("Connected to database");
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

connectDb();

export default prisma;
