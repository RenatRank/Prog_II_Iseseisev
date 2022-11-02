import express from "express";
import subjectsControllers from "./controllers";
const subjectsRoutes = express.Router();

subjectsRoutes
    .get("/", subjectsControllers.getAllSubjects)
    .post("/", subjectsControllers.addSubjects)
    .delete("/:id", subjectsControllers.deleteSubjects)
    .patch("/:id", subjectsControllers.updateSubjects);

export default subjectsRoutes;

