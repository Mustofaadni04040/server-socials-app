import { Expose } from 'class-transformer';

export class ResponseAuthDTO {
  @Expose()
  name: string;
  @Expose()
  email: string;
}
