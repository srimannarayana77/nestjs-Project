import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; //interact with MongoDB using Mongoose within your NestJS application.
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {User,UserSchema} from '../schemas/user.schema'
import { HashService } from '../helpers/hash';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])], // forFeatue tells the NestJS to make these models or schemas available within the module,User.name mean name stored in db like usersand user.schema means schema
  controllers: [UserController],
  providers: [UserService,HashService,JwtService],
})
export class UserModule {}
