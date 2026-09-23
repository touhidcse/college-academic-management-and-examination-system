import "dotenv/config";

import postgres from "@prisma/orm-postgres/runtime";

import type { Contract } from "../../prisma/contract.d";
import contractJson from "../../prisma/contract.json" with { type: "json" };

const prisma = postgres<Contract>({
    contractJson,
    url: process.env["DATABASE_URL"]!,
});

export { prisma };