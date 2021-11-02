import { verify, Secret, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

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
