import { SanitizedUser } from '../dto/sanitizedUser';
import { User } from '../schema/user.schema';

export interface IuserController {
  create(user: User): Promise<SanitizedUser>;

  findAll(): Promise<SanitizedUser[]>;

  findOne(id: string): Promise<SanitizedUser>;

  update(id: string, user: User): Promise<SanitizedUser | null>;

  remove(id: string): Promise<boolean>;
}
