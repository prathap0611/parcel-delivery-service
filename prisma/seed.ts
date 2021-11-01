import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcrypt';
import senderData from './seed-data/senders.json';
import bikerData from './seed-data/bikers.json';
const prisma = new PrismaClient();

async function seedSenders() {
    await Promise.all(
        senderData.map(async ({ email, name, mobile, password }) => {
            const salt = await genSalt();
            const hashedPassword = await hash(password, salt);
            return prisma.senders.upsert({
                where: { email: email },
                update: {},
                create: {
                    name,
                    email,
                    mobile,
                    password: hashedPassword,
                    salt,
                },
            });
        })
    );
}

async function seedBikers() {
    await Promise.all(
        bikerData.map(async ({ email, name, mobile, password }) => {
            const salt = await genSalt();
            const hashedPassword = await hash(password, salt);
            return prisma.bikers.upsert({
                where: { email: email },
                update: {},
                create: {
                    name,
                    email,
                    mobile,
                    password: hashedPassword,
                    salt,
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
