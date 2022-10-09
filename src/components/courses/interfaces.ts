interface INewCourse{
    courseName: string,
  };
  
  interface ICourse extends INewCourse{
     id:number,
  };

  export { ICourse, INewCourse};