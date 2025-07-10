import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema({ timestamps: true })
export class Booking {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Garage', required: true })
  garageId: Types.ObjectId;

  @Prop({ required: true })
  serviceType: string;

  @Prop({ required: true })
  scheduledDate: Date;

  @Prop({ required: true })
  scheduledTime: string;

  @Prop({
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @Prop()
  problemDescription: string;

  @Prop()
  estimatedPrice: number;

  @Prop()
  finalPrice: number;

  @Prop()
  notes: string;

  @Prop([String])
  photos: string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
