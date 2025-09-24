import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('For Fucks sake')
    .setDescription('Fuck you ')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documnet = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documnet);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
