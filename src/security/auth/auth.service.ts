import { ForbiddenException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  SignOptions,
  sign as Sign,
  verify as Verify,
  VerifyOptions,
  Jwt,
  JwtPayload,
  TokenExpiredError,
} from 'jsonwebtoken';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { ResponseTokensDto } from '../auth/dto/reponse-tokens.dto';

export interface IGetTokens {
  id: string;
  role: string;
}
@Injectable()
export class AuthService {
  hashPassword(password: string): string {
    const saltOrRounds = 10;
      const passwordHash = bcrypt.hashSync(password, saltOrRounds);
      console.log('hashp', passwordHash)
    return passwordHash;
  }
  compareHash(data: string, hash: string): boolean {
    return bcrypt.compareSync(data, hash);
  }
  generateHash(data: string): string {
    const saltOrRounds = 10;
    const passwordHash = bcrypt.hashSync(data, saltOrRounds);
    return passwordHash;
  }

  public accessToken(payload: JwtPayloadDto): string {
    const signOptions: SignOptions = {
      //algorithm: "RS256",
      jwtid: process.env.JWT_ACCESS_TOKEN_ID as string,
      subject: 'Validation',
      expiresIn: process.env.ACCESS_TOKEN_EXPIRATION,
    };
    const access_token: string =
      'Bearer ' + Sign(payload, process.env.PUBLIC_KEY as string, signOptions);
    return access_token;
  }
  public refreshToken(payload: JwtPayloadDto): string {
    const signOptions: SignOptions = {
      //algorithm: "RS256",
      jwtid: process.env.JWT_REFRESH_TOKEN_ID as string,
      subject: 'Validation',
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    };
    const refresh_token: string =
      'Bearer ' + Sign(payload, process.env.PRIVATE_KEY as string, signOptions);
    return refresh_token;
  }
  public getTokens(payload: JwtPayloadDto): ResponseTokensDto {
    const accessToken: string = this.accessToken(payload);
    const refreshToken: string = this.refreshToken(payload);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
    };
  }
  public async validateAccessToken(
    bearerHeader: string,
  ): Promise<Jwt | JwtPayload> {
      const token: string = bearerHeader.split(' ')[1];
    //  console.log('error Show:', token)
    const verifyOptions: VerifyOptions = {
      //algorithms: ['RS256'],
      jwtid: process.env.JWT_ACCESS_TOKEN_ID as string,
      subject: 'Validation',
      maxAge: process.env.ACCESS_TOKEN_EXPIRATION,
      ignoreExpiration: true,
    };
    try {
      const decodedPayload: string | Jwt | JwtPayload = Verify(
        token,
        process.env.PUBLIC_KEY as string,
        verifyOptions,
      );
      if (typeof decodedPayload === 'string') return undefined;
      else return decodedPayload;
    } catch (err) {
      throw new TokenExpiredError(
        'Access token is either expired or invalid',
        err,
      );
    }
  }
  public async validateRefreshToken(
    bearerHeader: string,
  ): Promise<Jwt | JwtPayload> {
    const token: string = bearerHeader.split(' ')[1];
    const verifyOptions: VerifyOptions = {
      //algorithms: ['RS256'],
      jwtid: process.env.JWT_REFRESH_TOKEN_ID as string,
      subject: 'Validation',
      maxAge: process.env.REFRESH_TOKEN_EXPIRATION,
      ignoreExpiration: true,
    };
    try {
      const decodedPayload: string | Jwt | JwtPayload = Verify(
        token,
        process.env.PRIVATE_KEY as string,
        verifyOptions,
      );
      if (typeof decodedPayload === 'string') return undefined;
      else return decodedPayload;
    } catch (err) {
      throw new TokenExpiredError(
        'Refresh token is either expired or invalid',
        err,
      );
    }
  }
  public async validateRoles(
    bearerHeader: string,
    roles: string[],
  ): Promise<boolean> {
    const decodedPayloadForAt: any = await this.validateAccessToken(
      bearerHeader,
    );
    if (!roles.includes(decodedPayloadForAt.role)) {
      throw new ForbiddenException(
        'You tried to access a role without being authorized',
      );
    } else {
      return true;
    }
  }
  public async validateAccessTokenWithoutException(
    bearerHeader: string,
  ): Promise<Jwt | JwtPayload> {
    const token: string = bearerHeader.split(' ')[1];
    const verifyOptions: VerifyOptions = {
      //algorithms: ['RS256'],
      jwtid: process.env.JWT_ACCESS_TOKEN_ID as string,
      subject: 'Validation',
      maxAge: process.env.ACCESS_TOKEN_EXPIRATION,
      ignoreExpiration: true,
    };
    try {
      const decodedPayload: string | Jwt | JwtPayload = Verify(
        token,
        process.env.PUBLIC_KEY as string,
        verifyOptions,
        );
       
        
      if (typeof decodedPayload === 'object')
        return decodedPayload;
      else return undefined;
    } catch (e) {
      return undefined;
    }
  }
}
