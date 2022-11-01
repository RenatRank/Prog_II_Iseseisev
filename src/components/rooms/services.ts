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

    deleteRooms: (id: number) => {
        const index = rooms.findIndex(element => element.id === id);

        rooms.splice(index, 1);
        return index;
    },
    
    updateRooms: (id: number) => {
        const room = rooms.find(element => element.id === id);
        return room;
    }
    
};
export default roomsServices;