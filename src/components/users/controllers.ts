import { NextFunction, Request, Response } from "express";

import { INewUser, IUser, IUserWithouRole } from "./interfaces";
import usersServices from "./services";


const usersControllers = {
    getAllUsers: async (req: Request, res: Response) => {
      const users_ = await usersServices.getAllUsers();
      res.status(200).json({
          success: true,
          message: 'List of users',
          users: users_,
          
      });
  },
    
    getUserById: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        let user: IUser | undefined = await usersServices.findUserById(id);
          if (!user) {
            return res.status (404).json({
              success: false,
              message: "User not found",
            })
          } 
        return res.status(200).json({
          success: true,
          message: `User with ID ${user.id} found`,
          data: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }
          
        });
      },

      addUser: async (req: Request, res: Response) => {
        const { firstName, lastName, email, password } = req.body;
        const newUser: INewUser = {
            firstName,
            lastName,
            email,
            password,
            role: "User"
        };
        const id = await usersServices.addUser(newUser);
        return res.status(201).json({
            success: true,
            message: `User with id ${id} created`,
        });
    },

    deleteUser: async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const user = await usersServices.findUserById(id);
      if (!user) throw new Error('User not found');
      const result = usersServices.deleteUser(id);

    
      return res.status(200).json({
        success: true,
        message: "User deleted",
      });
    },
    

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
    const {
      firstName, lastName, email, password,
    } = req.body;

    const user = await usersServices.findUserById(id);
    if (!user) throw new Error('User not found');
    if (!firstName && !lastName && !email && !password) throw new Error('Nothing to change');

    const userToUpdate: IUserWithouRole = {
      id,
      firstName,
      lastName,
      email,
      password,
      
    };

    const result = usersServices.updateUser(userToUpdate);
    if (!result) throw new Error('Something happened while updating user');
    return res.status(200).json({
      success: true,
      message: 'User updated',
    });
    } catch (error) {
      next(error);
    }
  },
};


export default usersControllers;