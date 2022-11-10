import { createParamDecorator } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  },
);
