import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt fields
export class User {
  @Prop({ required: true, unique: true })
  email: string; // User's email address (unique)

  @Prop({ required: true })
  password: string; // User's hashed password

  @Prop({ required: true, enum: ['car_owner', 'garage_owner'] })
  role: string; // Role: either "car_owner" or "garage_owner"

  @Prop({
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      avatar: { type: String, required: false },
    },
  })
  profile: {
    name: string; // User's full name
    phone: string; // Phone number
    avatar?: string; // Optional avatar URL
  };
}

export const UserSchema = SchemaFactory.createForClass(User);