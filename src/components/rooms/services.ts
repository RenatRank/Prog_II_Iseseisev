import { rooms } from "../../mockData";
import { INewRoom, IRoom } from "./interfaces";

const roomsServices = {
    getAllRooms: () => {
        return rooms;
    },

    addRooms: (room:INewRoom): number => {
        const id = rooms.length + 1;
        const newRoom: IRoom = {
            id,
            roomNumber: room.roomNumber
        };
        rooms.push(newRoom); 
        return id;
    },
};
export default roomsServices;