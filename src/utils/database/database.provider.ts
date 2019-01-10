import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'MySqlConnection',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'admin',
        password: 'admin',
        database: 'blog',
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
