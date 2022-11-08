interface INewSubject{
    subjectName: string,
  };
  
  interface ISubject extends INewSubject{
     id: number,
  };

  interface INewSubjectSQL{
   subjectName: string,
 };

  export { INewSubject, ISubject, INewSubjectSQL};