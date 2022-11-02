import express from "express";
import coursesControllers from "./controllers";

const coursesRoutes = express.Router();

coursesRoutes
    .get("/", coursesControllers.getAllCourses)
    .post("/", coursesControllers.addCourse)
    .delete("/:id", coursesControllers.deleteCourse)
    .patch("/:id", coursesControllers.updateCourse);

export default coursesRoutes;