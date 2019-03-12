import { Inject, Injectable } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
  ) {}

  /**
   * Insert new user in DB
   *
   * @param data - Data to insert in user table
   * @returns - Resolves wih the user inserted
   */
  async create(data: Partial<User>) {
    return this.userRepository.save(new User(data));
  }

  /**
   *
   * @param userId
   */
  async deleteById(userId: string) {
    const user = await this.userRepository.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return this.userRepository.delete(userId);
  }

  /**
   * Returns a user identified by its email
   *
   * @param email - user email
   * @returns Resolves with User
   */
  async getByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  /**
   * Returns a user identified by its id
   *
   * @param id - user id
   * @returns Resolves with User
   */
  async getById(id: string) {
    return this.userRepository.findOne(id);
  }

  /**
   * Update specific user identified by its id with data passed in params
   *
   * @param userId - specific user to update
   * @param data - Data to update in user table
   * @returns - Resolves wih the user updated
   */
  async updateById(userId: string, data: Partial<User>) {
    return this.userRepository.save({ ...data, userId });
  }
}
