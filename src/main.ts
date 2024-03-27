import dotenv = require('dotenv');
import dotenvExpand = require('dotenv-expand');
import { NestFactory } from '@nestjs/core';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { resolve } from 'path';
import { readFile } from 'fs/promises';
import { AppModule } from './app.module';

const readApiYaml = async () => {
  const yamlPath = resolve(__dirname, '../doc/api.yaml');
  return await readFile(yamlPath, 'utf-8');
};

dotenvExpand.expand(dotenv.config());

const PORT = Number(process.env.PORT) || 4000;
console.log(`Application is working here: http://localhost:${PORT}`);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const apiConfig = await readApiYaml();
  const document = load(apiConfig) as OpenAPIObject;
  SwaggerModule.setup('/doc', app, document);

  await app.listen(PORT);
}

bootstrap();
