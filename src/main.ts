import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerCustomOptions, swaggerDocumentOptions } from './main.options';
import { DESCRIPTION, PATH, TITLE, VERSION } from './main.consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle(TITLE)
    .setDescription(DESCRIPTION)
    .setVersion(VERSION)
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, swaggerDocumentOptions);

  SwaggerModule.setup(PATH, app, documentFactory, swaggerCustomOptions);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
