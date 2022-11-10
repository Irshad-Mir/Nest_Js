import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { DeleteUserDto, GetUserDto, LoginDto } from './user.dto';
import UserRepository from './user.repository';
import {
  AuthService, IGetTokens, 
  
} from '../security/auth/auth.service';




@Injectable()
export class UserService {

  constructor(
    private readonly userRepoistorty: UserRepository,
    private readonly AuthService: AuthService,
   
  ) {}
  async createUsers(body: any): Promise<void> {
    const password = await this.AuthService.hashPassword(body.password);
    body.password = password;
    if (!body.role) {
      throw new BadRequestException(
        `Sorry, we could not find an role. Check for typos and try again`,
      );
    }
    const user = await this.userRepoistorty.createUsers(body);
    return user;
  }

  async getUser(): Promise<any> {
    const users = await this.userRepoistorty.getusers();
    return users;
  }

  async getUserRecord(p: GetUserDto): Promise<GetUserDto> {
    const { id: userId } = p;
    const users = await this.userRepoistorty.getusersRecord(parseInt(userId));

    return users;
  }

  async deleteUserById(p: DeleteUserDto): Promise<DeleteUserDto> {
    const { id: userId } = p;
    const users = await this.userRepoistorty.deleteuser(parseInt(userId));
    return users;
  }

  async userUpdate(body: any, id: any): Promise<void> {
    const user = await this.userRepoistorty.usersUpdate(body, id);
    return user;
  }

  async login(logins: LoginDto) {
    
    const users = await this.userRepoistorty.getUserr(
      logins.email,
      logins.role,
    );
    const [user] = users;
    if (!user) {
      throw new UnauthorizedException(
        `Sorry, we could not find an account with this email address. Check for typos and try again`,
      );
    }
    if (!this.AuthService.compareHash(logins.password, user.password)) {
      const message =
        'Sorry, the password that you entered is incorrect. Please try again';
      throw new UnauthorizedException(message);
    }
    const getToken: IGetTokens = {
      id: user.id,
      role: user.role,
    };

    const tokens = await this.AuthService.getTokens(getToken);

    const [onboarding] = await Promise.all([
      this.userRepoistorty.updateUserById(user.id, tokens.refresh_token),
      //this.UsersRepo.getOnboardingByUserId(user.id),
    ]);
    return { ...tokens, id: user.id, onboarding };
  }
}
