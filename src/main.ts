
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Product Management')
    .setDescription('API for managing products in a store, including CRUD operations for product management. Features include adding, viewing, editing, and deleting products. Products can be filtered and sorted by category and price. User authentication allows guest users to register and login, while authorization restricts product management functionalities to store owners.')
    .setVersion('1.0')
    .addTag('CRUD')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
