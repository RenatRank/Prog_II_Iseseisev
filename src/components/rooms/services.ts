import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { rooms } from "../../mockData";
import { INewRoom, INewRoomSQL, IRoom } from "./interfaces";

const roomsServices = {
    getAllRooms: async () => {
        const rooms = await pool.query ("SELECT id, roomNumber, dateCreated FROM API_rooms WHERE dateDeleted is NULL;");
        return rooms[0];
    },

    addRooms: async (room:INewRoomSQL): Promise<number> => {
        const [result]: [ResultSetHeader, FieldPacket[]]  = await pool.query("INSERT INTO API_rooms SET ?;", [room])
        return result.insertId;
    },

    deleteRooms: async (id: number) => {
        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_rooms SET dateDeleted=? WHERE id=?;", [new Date(), id])
        console.log(result)
        return result.insertId;
    },
    
    updateRooms: async (roomToUpdate: INewRoom, id: number): Promise<Boolean> => {
        const newRoom: INewRoomSQL = {
            roomNumber: roomToUpdate.roomNumber
          };   
        const [roomsToUpdate]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_rooms SET roomNumber = ? WHERE id = ?;", [newRoom.roomNumber, id]);
        if(roomsToUpdate.affectedRows == 0){ return false;}
        else{return true;};     

    }
    
};
export default roomsServices;