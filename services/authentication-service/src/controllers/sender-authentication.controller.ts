import logger from '../utils/logger';
import { PrismaClient } from '@prisma/client';
import { createToken } from '../utils/authentication';
import { genSalt, hash } from 'bcrypt';
import { ClientAuthenticationError, InternalServerError } from '../utils/error';
const prisma = new PrismaClient();

export async function register({
    name,
    email,
    password,
    mobile,
}: {
    name: string;
    email: string;
    password: string;
    mobile: string;
}): Promise<string> {
    try {
        const salt = await genSalt();
        const hashedPassword = await hash(password, salt);
        const { id } = await prisma.senders.create({
            data: {
                name,
                email,
                mobile,
                password: hashedPassword,
                salt,
            },
            select: { id: true },
        });

        return await createToken(
            {
                id,
                name,
                email,
            },
            process.env.USER_AUTH_SECRET as string
        );
    } catch (error) {
        logger.error(error);
        throw new InternalServerError('Failed to register sender');
    }
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<string> {
    try {
        const data = await prisma.senders.findUnique({
            where: { email },
            select: { salt: true, password: true, id: true, name: true },
        });

        if (data) {
            const hashedPassword = await hash(password, data.salt);
            if (hashedPassword === data.password) {
                return await createToken(
                    {
                        id: data.id,
                        name: data.name,
                        email,
                    },
                    process.env.USER_AUTH_SECRET as string
                );
            }
        }
        throw new ClientAuthenticationError(
            'Either username or password is incorrect'
        );
    } catch (error) {
        logger.error(error);
        throw new InternalServerError('Failed to login sender');
    }
}
