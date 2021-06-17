import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Portfolio Manager')
    .setDescription(
      'API for management of users and connections to different exchanges',
    )
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const options = new DocumentBuilder().addBasicAuth();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap().then(() => console.log('API initialized'));
