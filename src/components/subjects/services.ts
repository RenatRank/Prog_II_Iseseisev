
import { FieldPacket, ResultSetHeader } from "mysql2";
import pool from "../../database";
import { ISubject, INewSubject, INewSubjectSQL } from "./interfaces";

const subjectsServices = {
    getAllSubjects: async () => {
        const subjects = await pool.query("SELECT id, subjectName, dateCreated FROM API_subjects WHERE dateDeleted is NULL;")
        return subjects[0];
    },

    addSubjects: async (subject: INewSubject) => {
        const newSubject: INewSubjectSQL = {
            subjectName: subject.subjectName,
          };
        const [result]: [ResultSetHeader, FieldPacket[]]  = await pool.query("INSERT INTO API_subjects SET ?;", [newSubject])
        return result.insertId;

    },

    deleteSubjects: async (id:number) => {
        const [result] = await pool.query("UPDATE API_subjects SET dateDeleted=? WHERE id=?;", [new Date(), id]);
        return id;
    },

    updateSubjects: async (id:number, subjectName:string) => {
        const checkName  = await pool.query ("SELECT subjectName FROM API_subjects WHERE id = ?;", [id]);
        console.log(checkName[0]);

        const update = {
            subjectName: subjectName

        };

        const [result]: [ResultSetHeader, FieldPacket[]] = await pool.query("UPDATE API_subjects SET ? WHERE id=?;", [update, id]); 
        return true;

    }
};

export default subjectsServices;