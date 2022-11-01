import { Request, Response } from "express";
import { INewRoom } from "./interfaces";
import roomsServices from './services';

const roomsControllers = {
    getAllRooms: (req: Request, res: Response) => {
        const allRooms = roomsServices.getAllRooms();	
        res.status(200).json({
          success: true,
          message: "List of rooms:",
          rooms: allRooms
        });
      },


    addRooms: (req: Request, res: Response) => {
      const { id, roomNumber } = req.body;
      
      if(!roomNumber){
        return res.status(400).json({
          success: false,
          message: `Some data is missing (roomNumber)`,
      });
  
      };
      const newRoom: INewRoom = {
          id,
          roomNumber

      };
      const id_ = roomsServices.addRooms(newRoom);
      return res.status(201).json({
          success: true,
          message: `Room with id ${id_} created`,
      });
  },

};

export default roomsControllers;