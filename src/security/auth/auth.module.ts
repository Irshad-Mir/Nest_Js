import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import jwtOptions from './jwt.config';
import { AuthJwtStrategy } from './auth.jwt.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [AuthService, AuthJwtStrategy, ],
  exports: [AuthService, ],
})
export class AuthModule {}
