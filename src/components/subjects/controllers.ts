import { Request, Response } from "express";
import { INewSubject } from "./interfaces";

import subjectsServices from "./services";

const subjectsControllers = {
    getAllSubjects: (req: Request, res: Response) => {
        const AllSubjects = subjectsServices.getAllSubjects();
        res.status(200).json({
          success: true,
          message: "List of subjects:",
          subjects: AllSubjects
        });
      },
    
    addSubjects: (req: Request, res: Response) => {
        const {subjectName}= req.body;
        const newSubject: INewSubject = {
            subjectName,
        };
        const id = subjectsServices.addSubjects(newSubject);
        res.status(201).json({
          success: true,
          message: `Subject with ID ${id} created`,
        });
      },
    
    deleteSubjects: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = subjectsServices.deleteSubjects(id);
          if (index === -1) {
            return res.status (404).json({
              success: false,
              message: "Subject not found",
            })
          } 
        
        return res.status(200).json({
          success: true,
          message: `Subject with ID ${id} deleted`,
        });
      },

    updateSubjects: (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { subjectName } = req.body;
        const subject = subjectsServices.updateSubjects(id);
          if (!subject) {
            return res.status (404).json({
              success: false,
              message: "Subject not found",
            });
          }
          if (!subjectName) {
            return res.status (404).json({
              sucess:false,
              message: 'Nothing to change!',
            });
          }
          if (subjectName) subject.subjectName = subjectName;
      
        return res.status(200).json({
          success: true,
          message: 'Subject data changed',
        });
      }
}

export default subjectsControllers;