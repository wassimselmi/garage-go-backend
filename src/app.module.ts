import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { AuthModule } from './auth/auth.module'; // Import AuthModule


@Module({
  imports: [
    // Load configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // Connect to MongoDB
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    // Import UsersModule
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}