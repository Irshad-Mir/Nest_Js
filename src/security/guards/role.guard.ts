import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRoles } from '../../user/user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly _authService: AuthService,
    private readonly _reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validate(request, context);
  }
  validate(
    request: Request,
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = request;
    const bearerAccessToken: string = headers['access_token'];
    const roles = this._reflector.get<UserRoles[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;
    else return this._authService.validateRoles(bearerAccessToken, roles);
  }
}
