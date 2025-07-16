import { PrismaClient, Prisma } from "../app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
    {
        name: "Alice",
        email: "alice@prisma.io",
        phone: "0613785132",
    },
    {
        name: "Bob",
        email: "bob@prisma.io",
        phone: "0613785132",
    },
];

export async function main() {
    for (const u of userData) {
        await prisma.user.create({ data: u });
    }
}

main();
