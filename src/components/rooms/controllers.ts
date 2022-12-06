import { Request, Response } from "express";
import { INewRoom, INewRoomSQL, IRoom } from "./interfaces";
import roomsServices from './services';

const roomsControllers = {
    getAllRooms: async (req: Request, res: Response) => {
        const allRooms = await roomsServices.getAllRooms();	
        res.status(200).json({
          success: true,
          message: "List of rooms:",
          rooms: allRooms
        });
      },


    addRooms: async (req: Request, res: Response) => {
      const { roomNumber } = req.body;
      if(!roomNumber){
        return res.status(400).json({
          success: false,
          message: `Can't insert empty value`,
      });
  
      };
      const newRoom: INewRoomSQL = {
        roomNumber
      };
      const id_ = await roomsServices.addRooms(newRoom);
      return res.status(201).json({
          success: true,
          message: `Room with id ${id_} created`,
      });
  },

    deleteRooms: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = await roomsServices.deleteRooms(id);
          if (index == id) {
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

    updateRooms: async (req: Request, res: Response) => {
      const id = parseInt(req.params.id);
      const { roomNumber} = req.body;
      const roomToUpdate: INewRoom = {
        id,
        roomNumber
    
    }
      const room = await roomsServices.updateRooms(roomToUpdate, id);
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

      return res.status(200).json({
        success: true,
        message: 'Room data changed',
      });
    }

};

export default roomsControllers;