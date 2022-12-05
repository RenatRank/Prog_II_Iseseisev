import { users } from "../../mockData";
import authServices from "../auth/services";
import { INewUser, IUser, IUserWithoutPassword, IUserWithouRole, INewUserSQL, IUserSQL } from "./interfaces";
import pool from "../../database";
import { FieldPacket, ResultSetHeader } from "mysql2";
import { readSync } from "fs";


const usersServices= {
    
    getAllUsers: async () => {

        const [users] = await pool.query("SELECT id, firstName, lastName, email, role, dateCreated FROM API_users WHERE dateDeleted is NULL;");
        return users;
        
    },

    findUserByEmail: async (email:string) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, email, password, role FROM API_users WHERE email=? AND dateDeleted IS NULL;`, [email]);
        return user[0];
    },

    findUserById: async (id: number) => {
        const [user]: [IUserSQL[], FieldPacket[]] = await pool.query(`SELECT id, firstName, lastName, email, role, password FROM API_users WHERE id=? AND dateDeleted IS NULL;`, [id]);
        return user[0];
    },
    
    addUser: async (user:INewUser): Promise<number> => {
        const hashedPassword = await authServices.hash(user.password);
        const newUser = {
            
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hashedPassword,
            role: "User"
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query("INSERT INTO API_users SET ?;", [newUser]);
        return result.insertId;
    },

    deleteUser: async (id: number): Promise<Boolean> => {
        const result = await pool.query("UPDATE API_users SET dateDeleted=? WHERE id=?;", [new Date(), id]);
        return true;
    },

    updateUser: async (userToUpdate: IUserWithouRole ): Promise<Boolean> => {
        const { id, firstName, lastName, email, password } = userToUpdate;
        const user = await usersServices.findUserById(id);
        let hashedPassword = null; 
        if (userToUpdate.password){
            const hashedPassword = await authServices.hash(userToUpdate.password);
        }
        const update = {
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            password: hashedPassword || user.password,
            email: email  || user.email
        };
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_users SET ? WHERE id=?;", [update, userToUpdate.id]); 
        return true;
    } 
    
};


export default usersServices;