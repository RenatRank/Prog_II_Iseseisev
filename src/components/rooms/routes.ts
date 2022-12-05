import express from "express";
import authMiddlewares from "../auth/middleware";
import roomsControllers from "./controllers";

const roomsRoutes = express.Router();

roomsRoutes
    .get("/", roomsControllers.getAllRooms)
    .post("/", authMiddlewares.isAdmin, roomsControllers.addRooms)
    .delete("/:id", authMiddlewares.isAdmin, roomsControllers.deleteRooms)
    .patch("/:id", authMiddlewares.isAdmin, roomsControllers.updateRooms);

export default roomsRoutes;
    