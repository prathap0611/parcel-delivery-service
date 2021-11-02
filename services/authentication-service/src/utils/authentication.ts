import { sign, Secret, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const signPromisified = promisify<
    Record<string, unknown> | string | Buffer,
    Secret,
    SignOptions,
    string
>(sign);

export async function createToken<T>(info: T, secret: string): Promise<string> {
    return signPromisified(info as unknown as Record<string, unknown>, secret, {
        expiresIn: '7d',
    });
}

const verifyPromisified = promisify<
    string,
    Secret,
    VerifyOptions,
    Record<string, unknown>
>(verify);

export async function verifyToken(
    token: string,
    secret: string
): Promise<Record<string, unknown>> {
    return verifyPromisified(token, secret, {});
}
