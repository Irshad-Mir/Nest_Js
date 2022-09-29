import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './local.startegy';
import{JwtModule} from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule, UserModule, JwtModule.register({
    secret:"key",
    signOptions:{
        expiresIn:"5d"
    }
    
  })],
  controllers: [],
  providers: [LocalStrategy,JwtStrategy, AuthService],
  exports:[AuthService]
})
export class AuthModule {}