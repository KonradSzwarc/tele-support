import crypto from 'node:crypto';
import { promisify } from 'node:util';

const randomBytes = promisify(crypto.randomBytes);
const pbkdf2 = promisify(crypto.pbkdf2);

const separator = ':';

export const encryptPassword = async (password: string) => {
  const salt = (await randomBytes(16)).toString('hex');
  const hash = (await pbkdf2(password, salt, 1000, 64, 'sha512')).toString('hex');

  return `${salt}${separator}${hash}`;
};

export const comparePasswordWithHash = async (databasePassword: string, passwordToCheck: string) => {
  const [salt, databaseHash] = databasePassword.split(separator);
  const providedHash = (await pbkdf2(passwordToCheck, salt, 1000, 64, 'sha512')).toString('hex');

  return databaseHash === providedHash;
};
