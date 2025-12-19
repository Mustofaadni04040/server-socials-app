import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import type { ClassConstructor } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export function TransformDTO<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new TransformDTOInterceptor(dto));
}

@Injectable()
export class TransformDTOInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: ClassConstructor<T>) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { path } = context.switchToHttp().getRequest();
    const isAuthenticationUrl = path.includes('auth');

    return next.handle().pipe(
      map((data) => {
        if (isAuthenticationUrl) {
          return {
            message: 'Success',
            data: plainToInstance(this.dtoClass, data.user, {
              excludeExtraneousValues: true,
            }),
            accessToken: data.accessToken,
          };
        }
      }),
    );
  }
}
