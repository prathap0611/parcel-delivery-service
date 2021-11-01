import { PrismaClient } from '@prisma/client';
import senderData from './seed-data/senders.json';
import bikerData from './seed-data/bikers.json';
const prisma = new PrismaClient();

async function seedSenders() {
    await Promise.all(
        senderData.map(({ email, name, mobile, password }) => {
            return prisma.senders.upsert({
                where: { email: email },
                update: {},
                create: {
                    name,
                    email,
                    mobile,
                    password,
                    salt: 'temp',
                },
            });
        })
    );
}

async function seedBikers() {
    await Promise.all(
        bikerData.map(({ email, name, mobile, password }) => {
            return prisma.bikers.upsert({
                where: { email: email },
                update: {},
                create: {
                    name,
                    email,
                    mobile,
                    password,
                    salt: 'temp',
                },
            });
        })
    );
}

(async () => {
    try {
        await seedBikers();
        await seedSenders();
    } catch (error) {
        console.error(error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
})();
