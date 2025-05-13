import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { WorkforceSubgraphModule } from './workforce-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkforceSubgraphModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: false,
    },
  });
  await app.listen(process.env.WORKFORCE_PORT ?? 3002);

  console.log(
    `🚀  Workforce subgraph running on port ${process.env.WORKFORCE_PORT ?? 3002}`,
  );
}
bootstrap();