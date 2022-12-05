import express from "express";
import authMiddlewares from "../auth/middleware";
import subjectsControllers from "./controllers";
const subjectsRoutes = express.Router();

subjectsRoutes
    .get("/", subjectsControllers.getAllSubjects)
    .post("/", authMiddlewares.isAdmin, subjectsControllers.addSubjects)
    .delete("/:id", authMiddlewares.isAdmin, subjectsControllers.deleteSubjects)
    .patch("/:id", authMiddlewares.isAdmin, subjectsControllers.updateSubjects);

export default subjectsRoutes;

