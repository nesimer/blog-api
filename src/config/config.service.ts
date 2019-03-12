import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv-safe';
import * as path from 'path';

type EnvType =
  | 'DB_PORT'
  | 'DB_NAME'
  | 'DB_HOST'
  | 'DB_USER'
  | 'DB_PWD'
  | 'PORT'
  | 'SECRET_KEY'
  | 'DEFAULT_EXPIRATION'
  | 'AUTH_ALGORITHM';

@Injectable()
export class ConfigService {
  constructor() {
    let filename = '.env';
    if (process.env.NODE_ENV === 'test') {
      filename = `.env.${process.env.NODE_ENV}`;
    }
    dotenv.load({
      path: path.resolve(process.cwd(), filename),
      allowEmptyValues: true,
    });
  }

  getBoolean(key: EnvType) {
    return !!process.env[key];
  }

  getNumber(key: EnvType) {
    return +(process.env[key] || 0) as number;
  }

  getString(key: EnvType) {
    return process.env[key];
  }
}

export const configService = new ConfigService();
