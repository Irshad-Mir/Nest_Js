import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';

import { PostsModule } from './posts/posts.module';

import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './security/auth/auth.module';
import { RolesGuard } from './security/guards/role.guard';
import { APP_GUARD } from '@nestjs/core';


// ****** Social businuss app ******* //

// *** User have 3 Api *** //

// **** Posts Have 4 Api  **** //

// **** Comments Have 4 Api  **** //

// **** Likes Have 4 Api  **** //

// **** products Have 2 Api  **** //

// **** carts Have 2 Api  **** //



@Module({
  imports: [
    UserModule,
    PostsModule,
    CommentsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    LikesModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
