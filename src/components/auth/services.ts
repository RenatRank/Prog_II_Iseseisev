import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { IUser } from '../users/interfaces';
const saltRounds = 10;
const jwtSecret = "sidjfaksndfzzxzjl<sldemrslefm<--"
const authServices = {
    hash: async (password: string): Promise<string> => {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(hash);
        return hash;
        
    },
    
    compare: async (password:string, hash: string): Promise<boolean> => {
        const match = await bcrypt.compare(password, hash);
        return match;

    },

    sign: async (user: IUser): Promise<string> => {
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const token = await jwt.sign(payload, jwtSecret, {expiresIn: "2h"});
        return token;
    },

    verify: async (token: string) => {
        const decoded = await jwt.verify(token, jwtSecret);
        return decoded;
    }
};

export default authServices;
