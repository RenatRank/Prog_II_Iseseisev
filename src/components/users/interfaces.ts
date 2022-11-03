interface INewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin" | "User";
}

interface IUser extends INewUser {
    id: number;
}

interface IUserWithoutPassword {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: "Admin" | "User";
}

interface IUserWithouRole {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export { INewUser, IUser, IUserWithoutPassword, IUserWithouRole };