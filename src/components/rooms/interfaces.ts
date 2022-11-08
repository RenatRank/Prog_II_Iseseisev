interface INewRoom {
    id: any;
    roomNumber: string
  };
  
  interface IRoom extends INewRoom {
    id: number
  };

  interface INewRoomSQL {

    roomNumber: string
  };

  export { INewRoom, IRoom, INewRoomSQL};