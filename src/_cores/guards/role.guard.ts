import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser as IUserPayload;
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    ) as IRole[];

    if (!requiredRoles) {
      return true;
    }

    if (requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.includes('admin') && currentUser.role === 'admin') {
      return true;
    }

    if (requiredRoles.includes('user') && currentUser.role === 'user') {
      const userId = currentUser._id;
      const resourceId = request.params.id as string;

      if (userId === resourceId) {
        return true;
      }

      throw new ForbiddenException('Forbidden to access another user resource');
    }

    console.log(requiredRoles);

    throw new ForbiddenException("You don't have permission to access");
  }
}
