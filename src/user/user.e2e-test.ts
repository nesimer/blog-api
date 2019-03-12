import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { getConnection } from 'typeorm';
import { setupDB } from '../../test/tools/setup.tools';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from './../auth/auth.service';
import { UserModule } from './user.module';
import { UserRepository } from './user.repository';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    await setupDB();

    const moduleFixture = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.get(UserRepository).clear();
    await app.close();
    await getConnection().close();
  });

  describe('/user/:id', () => {
    describe('GET', () => {
      let token: string;

      beforeAll(async () => {
        const authService = app.get(AuthService);

        const result = await authService.signUp({
          email: 'email@email.com',
          firstName: 'Michel',
          lastName: 'Jacques',
          mobilePhone: '0708090102',
          password: 'azerty',
        });

        token = `bearer ${result.token}`;
      });

      it('should return user with id passed in route', async () => {
        const userRepository = getConnection().getCustomRepository(
          UserRepository,
        );

        await userRepository.save({
          userId: '94de84ca-ad78-48ec-8533-63bf6f07bbf7',
          email: 'fe@fez.com',
          password: 'azerty',
        });

        return request(app.getHttpServer())
          .get('/user/94de84ca-ad78-48ec-8533-63bf6f07bbf7')
          .set('Authorization', token)
          .expect(200)
          .then(res => {
            expect(res.body).toMatchObject({
              userId: '94de84ca-ad78-48ec-8533-63bf6f07bbf7',
              email: 'fe@fez.com',
              password: expect.any(String),
            });
          });
      });
    });
  });
});
