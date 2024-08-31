// Nest JS
import { Injectable } from '@nestjs/common';

// TypeORM
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

// Entities
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // ============================================= GET USER BY ID =============================================
  /**
   * @description This method retrieves a user entity by its unique identifier (id).
   *
   * @param {Object} options - An object containing the necessary parameters for finding the user.
   * @param {string} options.id - The unique identifier of the user to be retrieved.
   * @param {FindOptionsSelect<UserEntity>} [options.select] - An optional parameter specifying the fields to be selected from the user entity.
   * @param {FindOptionsRelations<UserEntity>} [options.relations] - An optional parameter specifying the relations to be loaded for the user entity.
   *
   * @returns {Promise<UserEntity>} - Returns a Promise that resolves to the found user entity.
   *
   * @throws {Error} - If an error occurs during the database operation.
   *
   * @example
   * const user = await userRepository.getUserFromDB({ id: '123456' });
   * console.log(user);
   */
  getUserFromDB({
    where,
    select,
    relations,
  }: {
    where?: FindOptionsWhere<UserEntity>;
    select?: FindOptionsSelect<UserEntity>;
    relations?: FindOptionsRelations<UserEntity>;
  }): Promise<UserEntity> {
    return this.userRepository.findOne({
      where,
      select,
      relations,
    });
  }

  // ============================================= Update USER =============================================
  /**
   * @description This method updates an existing user entity based on the provided criteria.
   *
   * @param {Object} options - An object containing the necessary parameters for updating the user.
   * @param {Partial<UserEntity>} options.data - An object containing the updated user data.
   * @param {FindOptionsWhere<UserEntity>} options.where - An object specifying the criteria to find the user to be updated.
   * @param {FindOptionsRelations<UserEntity>} [options.relations] - An optional parameter specifying the relations to be loaded for the updated user entity.
   * @param {FindOptionsSelect<UserEntity>} [options.select] - An optional parameter specifying the fields to be selected from the updated user entity.
   *
   * @returns {Promise<UserEntity>} - Returns a Promise that resolves to the updated user entity.
   *
   * @throws {Error} - If an error occurs during the database operation.
   *
   * @example
   * const updatedUser = await userRepository.updateUser({
   *   data: { name: 'John Doe' },
   *   where: { id: '123456' },
   *   relations: ['role'],
   *   select: ['id', 'name', 'email'],
   * });
   * console.log(updatedUser);
   */
  async updateUser({
    data,
    where,
    relations,
    select,
  }: {
    data: Partial<UserEntity>;
    where: FindOptionsWhere<UserEntity>;
    relations?: FindOptionsRelations<UserEntity>;
    select?: FindOptionsSelect<UserEntity>;
  }): Promise<UserEntity> {
    await this.userRepository.update(where, data);
    return this.getUserFromDB({ where, relations, select });
  }
}
