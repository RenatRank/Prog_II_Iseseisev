import express from "express";
import roomsControllers from "./controllers";

const roomsRoutes = express.Router();

roomsRoutes
    .get("/", roomsControllers.getAllRooms)
    .post("/", roomsControllers.addRooms)
    .delete("/:id", roomsControllers.deleteRooms)
    .patch("/:id", roomsControllers.updateRooms);

export default roomsRoutes;
    