import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { userRepository } from './user.repository';

describe('User Controller', () => {
  let controller: UserController;
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: 'UserRepository', useValue: userRepository },
      ],
    }).compile();

    controller = module.get(UserController);
    service = module.get(UserService);
  });

  describe('getById', () => {
    it('should return the result of service.getById', async () => {
      const id = 'monId';
      const user = { name: 'toto' };
      service.getById = jest.fn().mockResolvedValue(user);

      const result = await controller.getById(id);

      expect(result).toBe(user);
      expect(service.getById).toHaveBeenCalledWith(id);
    });
  });
});
