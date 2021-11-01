import { sign, Secret, SignOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const signPromisified = promisify<
    object | string | Buffer,
    Secret,
    SignOptions,
    string
>(sign);

export async function createToken<T>(info: T, secret: string): Promise<string> {
    return signPromisified(info as unknown as object, secret, {
        expiresIn: '7d',
    });
}
