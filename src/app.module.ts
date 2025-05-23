import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { BacklogModule } from './backlog/backlog.module';
import { WorkforceModule } from './workforce/workforce.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      typePaths: ['./**/*.graphql'],
    }),
    BacklogModule,
    WorkforceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
