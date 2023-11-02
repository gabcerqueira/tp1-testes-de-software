import { Types } from 'mongoose';
import { User } from '../schema/user.schema';

type SanitizedClass = Pick<User, '_id' | 'name' | 'active' | 'email'>;

export class SanitizedUser implements SanitizedClass {
  _id: Types.ObjectId | string;
  name: string;
  active: boolean;
  email: string;
}
