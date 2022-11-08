import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { courses } from "../../mockData";
import { ICourse, INewCourse, INewCourseSQL } from "./interfaces";

const coursesServices = {
    getAllCourses: async () =>{
        const [courses] = await pool.query("SELECT id, courseName, dateCreated FROM API_courses where dateDeleted is NULL;");
        return courses;
    },

    addCourse: async (course: INewCourse) =>{
        const newCourse: INewCourseSQL = {
          courseName: course.courseName,
        };        
        const [courses]: [ResultSetHeader, FieldPacket[]] = await pool.query("INSERT INTO API_courses SET ?;", [newCourse]);
        return courses.insertId;
    },

    deleteCourse: async (id:number): Promise<Boolean> =>{
        const [coursesToUpdate]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_courses SET dateDeleted = ? WHERE id = ?;", [new Date(), id]);
        if(coursesToUpdate.affectedRows == 0){ return false;}
        else{return true;};      
        
    },

    updateCourse: async (courseToUpdate: INewCourse, id: number): Promise<Boolean> => {
        const newCourse: INewCourseSQL = {
            courseName: courseToUpdate.courseName,
          };   
        const [coursesToUpdate]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_courses SET courseName = ? WHERE id = ?;", [newCourse.courseName, id]);
        if(coursesToUpdate.affectedRows == 0){ return false;}
        else{return true;};     

    }
};

export default coursesServices;