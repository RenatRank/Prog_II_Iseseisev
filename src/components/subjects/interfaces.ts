interface INewSubject{
    subjectName: string,
  };
  
  interface ISubject extends INewSubject{
     id:number,
  };

  export { INewSubject, ISubject};