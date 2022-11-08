import express, { Request, Response, Express, NextFunction } from 'express';
import { ICourse, INewCourse } from './interfaces';
import coursesServices from './services';


const coursesControllers = {
getAllCourses: async (req: Request, res: Response) => {
    const courses_ = await coursesServices.getAllCourses();
    res.status(200).json({
      success: true,
      message: "List of courses:",
      courses: courses_,
    });
  },

  addCourse: async (req: Request, res: Response) => {
    const {courseName}= req.body;
    const newCourse: INewCourse = {
      courseName,
    };
    const id = await coursesServices.addCourse(newCourse);
    return res.status(201).json({
      success: true,
      message: `Course with ID ${id} created`,
    });
  },

  deleteCourse: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = await coursesServices.deleteCourse(id);
      if (!result) {
        return res.status (404).json({
          success: false,
          message: "Course not found",
        })
      } 
    
    return res.status(200).json({
      success: true,
      message: `Course with ID ${id} deleted`,
    });
  },

  updateCourse: async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { courseName } = req.body;
    const courseToUpdate: ICourse = {
          courseName,
          id
      }
    const course = await coursesServices.updateCourse(courseToUpdate, id);
      if (!course) {
        return res.status (404).json({
          success: false,
          message: "Course not found",
        });
      }
      if (!courseName) {
        return res.status (404).json({
          sucess:false,
          message: 'Nothing to change!',
        });
      }

    return res.status(200).json({
      success: true,
      message: 'Course data changed',
    });
  }
}
  export default coursesControllers;