interface INewRoom {
    roomNumber: string
  };
  
  interface IRoom extends INewRoom {
    id: number
  };

  export { INewRoom, IRoom};