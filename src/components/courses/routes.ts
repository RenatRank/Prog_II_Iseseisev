import express from "express";
import authMiddlewares from "../auth/middleware";
import coursesControllers from "./controllers";

const coursesRoutes = express.Router();

coursesRoutes
    .get("/", coursesControllers.getAllCourses)
    .post("/", authMiddlewares.isAdmin, coursesControllers.addCourse)
    .delete("/:id", authMiddlewares.isAdmin, coursesControllers.deleteCourse)
    .patch("/:id", authMiddlewares.isAdmin, coursesControllers.updateCourse);

export default coursesRoutes;