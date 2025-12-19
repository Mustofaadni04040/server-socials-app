interface IUserPayload {
  _id: string;
  email: string;
  name: string;
  role: string;
}

declare namespace Express {
  export interface Request {
    currentUser?: IUserPayload;
  }
}
