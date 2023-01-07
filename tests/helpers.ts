import prisma from "../src/dbStrategy/postgres";

export async function cleanDb() {
    await prisma.wallet.deleteMany({});
    await prisma.session.deleteMany({});
    await prisma.user.deleteMany({});
};