import { verify, Secret, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

const verifyPromisified = promisify<string, Secret, VerifyOptions, object>(
    verify
);

export async function verifyToken(
    token: string,
    secret: string
): Promise<object> {
    return verifyPromisified(token, secret, {});
}
