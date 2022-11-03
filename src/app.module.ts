import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

import { PostsModule } from './posts/posts.module';

import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';


// ****** In This Project Total 15 Api's ******* //

// *** User have 3 Api *** //

// **** Posts Have 4 Api  **** //

// **** Comments Have 4 Api  **** //

// **** Likes Have 4 Api  **** //


@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
