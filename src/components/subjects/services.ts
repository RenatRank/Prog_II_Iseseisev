import { idText } from "typescript";
import { subjects } from "../../mockData";
import { ISubject, INewSubject } from "./interfaces";

const subjectsServices = {
    getAllSubjects: () => {
        return subjects;
    },

    addSubjects: (subject: INewSubject) => {
        const id = subjects.length + 1;
        const newSubject: ISubject = {
            id,
            subjectName: subject.subjectName,
          };
        subjects.push(newSubject); 
        return id;
    },

    deleteSubjects: (id:number) => {
        const index = subjects.findIndex(element => element.id === id);
        subjects.splice(index, 1);
        return id;
    },

    updateSubjects: (id: number) => {
        const subject = subjects.find(element => element.id === id);
        
        return subject;

    }
};

export default subjectsServices;