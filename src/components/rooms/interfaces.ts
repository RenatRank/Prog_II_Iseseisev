interface INewRoom {
    id: any;
    roomNumber: string
  };
  
  interface IRoom extends INewRoom {
    id: number
  };

  export { INewRoom, IRoom};