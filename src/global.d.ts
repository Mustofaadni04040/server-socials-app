interface IUserPayload {
  _id: string;
  email: string;
  name: string;
  role: string;
}

type IRole = 'user' | 'admin';

declare namespace Express {
  export interface Request {
    currentUser?: IUserPayload;
  }
}
