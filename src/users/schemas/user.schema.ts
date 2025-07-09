import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['car_owner', 'garage_owner'] })
  role: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      avatar: { type: String, required: false },
    },
  })
  profile: {
    name: string;
    phone: string;
    avatar?: string;
  };

  @Prop({ default: true })
  isActive: boolean; // Added for user management

  @Prop({ default: false })
  isVerified: boolean; // Added for email verification
}

export const UserSchema = SchemaFactory.createForClass(User);