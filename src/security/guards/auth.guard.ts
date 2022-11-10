import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { Jwt, JwtPayload } from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly _authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    return this.validate(request);
  }
  async validate(request: Request): Promise<boolean> {
    const { headers } = request;
    const bearerAccessToken: string = headers['access_token'] as string;

    //const bearerRefreshToken: string  = headers["refresh_token"] as string;
    if (bearerAccessToken) {
      const decodePayloadForAT: Jwt | JwtPayload =
        await this._authService.validateAccessToken(bearerAccessToken);
      //const decodePayloadForRT: Jwt | JwtPayload= await this._authService.validateRefreshToken(bearerRefreshToken);
      if (decodePayloadForAT) {
        request.user = decodePayloadForAT;
        return true;
      } else false;
    } else
      throw new NotAcceptableException(
        'access_token is missing in the headers',
      );
  }
}
