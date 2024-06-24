import bcrypt from 'bcryptjs';
import { Md5 } from 'ts-md5';

export const encrypt = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const validate = async (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const compareSync = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
};

export const encryptSync = (password: string): string => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

export const createHash = (value: string): string => {
    return Md5.hashStr(value) as string;
};

