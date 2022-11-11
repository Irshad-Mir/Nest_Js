import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (_data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
