import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController, UserController, PostsController],
  providers: [AppService, UserService, ConfigService, PostsService],
})
export class AppModule {}
