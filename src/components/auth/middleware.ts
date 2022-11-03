import { Request, Response, NextFunction } from "express";
import authServices from "./services";

const authMiddlewares = {
    isLoggedIn: async (req: Request, res:Response, next: NextFunction) =>{
        const token = req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }
        try {
            const decoded = await authServices.verify(token);
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Token invalid"})
        }
        
        next();
    },
    isAdmin: (req: Request, res:Response, next: NextFunction) =>{
        if(res.locals.user.role !== "Admin")
            {
            return res.status(401).json({
                success: false,
                message: "You have to be admin"    
            })
            }
    }
}
export default authMiddlewares;