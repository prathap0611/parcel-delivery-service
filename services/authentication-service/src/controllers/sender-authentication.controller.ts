import logger from '../utils/logger';
import { PrismaClient, Senders } from '@prisma/client';
import { createToken } from '../utils/authentication';
import { genSalt, hash } from 'bcrypt';
import { HttpException } from '../utils/error';
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
}

export async function login({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<string | undefined> {
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
        } else {
            logger.error('Invalid password');
            throw new HttpException(
                403,
                'Either username or password is incorrect'
            );
        }
    } else {
        logger.error('Invalid email');
        throw new HttpException(
            403,
            'Either username or password is incorrect'
        );
    }
}

export async function getProfile(id: number): Promise<Partial<Senders>> {
    const data = await prisma.senders.findUnique({
        where: { id },
        select: { name: true, email: true, mobile: true },
    });

    if (!data) {
        throw new HttpException(404, 'Invalid User');
    }
    return data;
}
