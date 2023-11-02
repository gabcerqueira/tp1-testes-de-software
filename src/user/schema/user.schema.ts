import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  email: string;

  @Prop()
  password?: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id?: Types.ObjectId | string;
}

export const UserSchema = SchemaFactory.createForClass(User);
