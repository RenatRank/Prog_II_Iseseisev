import { courses } from "../../mockData";
import { ICourse, INewCourse } from "./interfaces";

const coursesServices = {
    getAllCourses: () =>{
        return courses;
    },

    addCourse: (course: INewCourse) =>{
        const id = courses.length + 1;
        const newCourse: ICourse = {
          id,
          courseName: course.courseName,
        };
        courses.push(newCourse); 
        return id;
    },

    deleteCourse: (id:number): Boolean =>{
        const index = courses.findIndex(element => element.id === id);
        if(index === -1) return false;
        courses.splice(index, 1);
        return true;
    },

    updateCourse: (courseToUpdate: ICourse, id: number): Boolean => {
        const {courseName} = courseToUpdate;
        const course = courses.find(element => element.id === id);
        if (course && courseName) course.courseName = courseName;
        return true;

    }
};

export default coursesServices;