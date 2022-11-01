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

    deleteRooms: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = roomsServices.deleteRooms(id);
          if (index === -1) {
            return res.status (404).json({
              success: false,
              message: "Room not found",
            })
          } 
        return res.status(200).json({
          success: true,
          message: `Room with ID ${id} deleted`,
        });
      
    },

    updateRooms: (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const { roomNumber} = req.body;
      const room = roomsServices.updateRooms(id);
        if (!room) {
          return res.status (404).json({
            success: false,
            message: "Room not found",
          });
        }
        if (!roomNumber) {
          return res.status (404).json({
            sucess: false,
            message: 'Nothing to change!',
          });
        }
        if (roomNumber) room.roomNumber = roomNumber;
    
      return res.status(200).json({
        success: true,
        message: 'Room data changed',
      });
    }

};

export default roomsControllers;