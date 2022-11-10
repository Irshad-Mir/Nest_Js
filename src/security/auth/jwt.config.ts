import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
const jwtOptions: JwtModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    secret: config.get<string>('PUBLIC_KEY'),
    signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
  }),
  inject: [ConfigService],
};
export default jwtOptions;
