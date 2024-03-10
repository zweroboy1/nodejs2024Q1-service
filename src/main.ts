import dotenv = require('dotenv');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config();
const PORT = Number(process.env.PORT) || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

bootstrap();