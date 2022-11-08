import { Request, Response } from "express";
import { INewSubject } from "./interfaces";

import subjectsServices from "./services";

const subjectsControllers = {
    getAllSubjects: async (req: Request, res: Response) => {
        const AllSubjects = await subjectsServices.getAllSubjects();
        res.status(200).json({
          success: true,
          message: "List of subjects:",
          subjects: AllSubjects
        });
      },
    
    addSubjects: async (req: Request, res: Response) => {
        const {subjectName}= req.body;
        const newSubject: INewSubject = {
            subjectName,
        };
        const id = await subjectsServices.addSubjects(newSubject);
        res.status(201).json({
          success: true,
          message: `Subject with ID ${id} created`,
        });
      },
    
    deleteSubjects: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const index = await subjectsServices.deleteSubjects(id);
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

    updateSubjects: async (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const { subjectName } = req.body;
        
        const subject = await subjectsServices.updateSubjects(id, subjectName);
          if (!subject) {
            return res.status (404).json({
              success: false,
              message: "Subject not found",
            });
          }
      /*    if (!subjectName) {
            return res.status (404).json({
              sucess:false,
              message: 'Nothing to change!',
            });
          }*/
          
      
        return res.status(200).json({
          success: true,
          message: 'Subject data changed',
        });
      }
}

export default subjectsControllers;