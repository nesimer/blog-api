import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeAll(() => {
    repository = {} as any;
    service = new UserService(repository);
  });

  describe('getById', () => {
    it('should call and return repository.findOne with id passed in param', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      repository.findOne = jest.fn().mockResolvedValue(user);

      const result = await service.getById(id);

      expect(result).toBe(user);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('updateById', () => {
    it('should call and return repository.updateById with id and object User passed in param', async () => {
      const id = 'monId';
      const user = {
        name: 'Juliette',
        password: 'Tfd15$',
      };
      repository.save = jest.fn().mockResolvedValue(user);

      const result = await service.updateById(id, user as any);

      expect(result).toBe(user);
      expect(repository.save).toHaveBeenLastCalledWith({ ...user, userId: id });
    });
  });

  describe('deleteById', () => {
    it('should throw an error when user not found by its id', async () => {
      const userId = 'ID-001';
      repository.findOne = jest.fn().mockResolvedValue(undefined);
      repository.delete = jest.fn();

      expect.assertions(4);
      try {
        await service.deleteById(userId);
      } catch (e) {
        expect(e.message).toBe('User not found');
        expect(e).toBeInstanceOf(Error);
      }
      expect(repository.findOne).toHaveBeenCalledWith(userId);
      expect(repository.delete).not.toHaveBeenCalled();
    });

    it('should delete user by its id when user has been found', async () => {
      const userId = 'ID-001';
      repository.findOne = jest.fn().mockResolvedValue({});
      repository.delete = jest.fn();

      await service.deleteById(userId);

      expect(repository.findOne).toHaveBeenCalledWith(userId);
      expect(repository.delete).toHaveBeenCalledWith(userId);
    });
  });

  describe('updateById', () => {
    it('should update a user identified by its id with data passed in params', async () => {
      const user: User = { userId: 'ID-001' } as any;
      const data: Partial<User> = { dto: 'dto' } as any;
      repository.save = jest.fn().mockResolvedValue(user);

      const result = await service.updateById(user.userId, data);

      expect(result).toBe(user);
      expect(repository.save).toHaveBeenCalledWith({
        ...data,
        userId: user.userId,
      });
    });
  });
});
