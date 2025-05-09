import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { BacklogSubgraphModule } from './backlog-subgraph.module';

async function bootstrap() {
  const app = await NestFactory.create(BacklogSubgraphModule, {
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
      credentials: false,
    },
  });
  await app.listen(process.env.BACKLOG_PORT ?? 3001);

  console.log(
    `🚀  Backlog subgraph running on port ${process.env.BACKLOG_PORT ?? 3001}`,
  );
}
bootstrap();