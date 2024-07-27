import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vishalgajjar74vg:q4qX6b8TNXV42noD@cluster7.fmfrome.mongodb.net/vishal-pesto',
    ),
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
