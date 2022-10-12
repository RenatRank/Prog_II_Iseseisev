import { Request, Response, NextFunction } from "express";

const usersMiddlewares = {
    checkAddUserData: (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password } = req.body;
        let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

        const Validator = isEmailValid(email);

        function isEmailValid(email: string) {
            if (!email)
                return false;

            if(email.length>254)
                return false;

            let valid = emailRegex.test(email);
            if(!valid)
                return false;

            let parts = email.split("@");
            if(parts[0].length>64)
                return false;

            let domainParts = parts[1].split(".");
            if(domainParts.some(function(part) { return part.length>63; }))
                return false;

            return true;
        }

        if(!Validator){
            return res.status(400).json({
                success: false,
                message: `Email error`,
            });
        };

        if (!firstName || !lastName || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: `Some data is missing (firstName, lastName, email, password)`,
            });
        };
        next();
    }
};

export default usersMiddlewares;