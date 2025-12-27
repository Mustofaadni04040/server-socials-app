import { Transform } from 'class-transformer';

export const ObjectId = () => {
  return Transform((value: any) => value.obj._id.toString());
};
