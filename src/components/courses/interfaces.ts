interface INewCourse{
    courseName: string,
  };
  
  interface ICourse extends INewCourse{
     id:number,
  };

  interface INewCourseSQL{
   courseName: string,
 };

  export { ICourse, INewCourse, INewCourseSQL};