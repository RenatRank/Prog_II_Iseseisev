import express, { Request, Response, Express, NextFunction } from 'express';
import { ICourse, INewCourse } from './interfaces';
import coursesServices from './services';


const coursesControllers = {
getAllCourses: (req: Request, res: Response) => {
    const courses_ = coursesServices.getAllCourses();
    res.status(200).json({
      success: true,
      message: "List of courses:",
      courses: courses_,
    });
  },

  addCourse: (req: Request, res: Response) => {
    const {courseName}= req.body;
    const newCourse: INewCourse = {
      courseName,
    };
    const id = coursesServices.addCourse(newCourse);
    return res.status(201).json({
      success: true,
      message: `Course with ID ${id} created`,
    });
  },

  deleteCourse: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const result = coursesServices.deleteCourse(id);
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

  updateCourse: (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { courseName } = req.body;
    const course = coursesServices.updateCourse;
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
      const courseToUpdate: ICourse = {
          courseName,
          id
      }
      coursesServices.updateCourse(courseToUpdate, id);
      //if (courseName) course.courseName = courseName;
  
    return res.status(200).json({
      success: true,
      message: 'Course data changed',
    });
  }
}
  export default coursesControllers;