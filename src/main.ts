import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);
  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  // Configurar o CORS
  app.use(
    cors({
      origin: 'http://localhost:5173', // Defina a origem permitida (ou ajuste para a origem do seu frontend)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
      credentials: true, // Habilita o uso de credenciais (cookies, autenticação, etc.)
    }),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL'));
  });
}

bootstrap();
