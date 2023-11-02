import { SanitizedUser } from '../dto/sanitizedUser';
import { User } from '../schema/user.schema';

export interface IuserRepository {
  createUser(user: User): Promise<User>;

  findAll(): Promise<User[]>;

  findById(id: string): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  update(userDto: User): Promise<User | null>;

  remove(id: string): Promise<boolean>;
}
