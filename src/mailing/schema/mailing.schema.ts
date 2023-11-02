import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongoSchema, Types } from 'mongoose';
import { MailingStatus } from 'src/shared/enums/mailing/MailingStatus';

export type MailingDocument = Mailing & Document;

@Schema({ timestamps: true, collection: 'users' })
export class Mailing {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
    index: true,
    unique: true,
  })
  email: string;

  @Prop()
  emailVerified?: string;

  @Prop()
  instagram?: string;

  @Prop({ default: MailingStatus.NEW })
  status?: MailingStatus;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  _id?: Types.ObjectId | string;
}

export const UserSchema = SchemaFactory.createForClass(Mailing);
