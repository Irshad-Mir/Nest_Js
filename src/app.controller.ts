import { Controller, Get, Post, UseFilters, UseGuards, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth/auth.service";
import { CONSTANTS } from "./constants";
import { RoleGuard } from "./role.guard";


@Controller('app')
export class AppController {
    constructor(private readonly authService:AuthService){}
    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req): string {
      const token=  this.authService.generateToken(req.user);
        return  token;
    }



    @Get('/Software-developer')
    @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.SOFTWARE_DEVELOPER))
    SoftwareDeveloperData(@Request() req): string {
        return 'This is the Private Data for Software Developer'+JSON.stringify(req.user);
    }

    @Get('/nodejs-developer')
    @UseGuards(AuthGuard('jwt'), new RoleGuard(CONSTANTS.ROLES.NODEJS_DEVELOPER))
    nodejsDeveloperData(@Request() req): string {
        return 'This is the Private Data for node Developer' + JSON.stringify(req.user);
    } 
}

