import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/role.decorator';
import { ResourceService } from 'src/resource/resource.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private resourceService: ResourceService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const currentUser = request.currentUser as IUserPayload;
    const resourceType = this.extractResource(request.path);

    if (!resourceType) {
      throw new BadRequestException('Invalid resource type');
    }

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
      const resourceId = request.params.id;
      const resourceIdOfUser = await this.resourceService.getResource(
        resourceType,
        resourceId,
      );

      if (userId === resourceIdOfUser) {
        return true;
      }

      throw new ForbiddenException('Forbidden to access another user resource');
    }

    throw new ForbiddenException("You don't have permission to access");
  }

  private extractResource(path: string): string | null {
    const paths = path.split('/');

    if (paths.length > 3) {
      return paths[3];
    }

    return null;
  }
}
