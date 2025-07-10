import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Connects the User schema to MongoDB
  ],
  controllers: [UsersController], // Exposes user-related API endpoints
  providers: [UsersService], // Contains business logic for users
  exports: [UsersService], // Makes the service available to other modules
})
export class UsersModule {}
