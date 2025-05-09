import { Module } from '@nestjs/common';
import { BacklogResolver } from './backlog.resolver';
import { BacklogService } from './backlog.service';
import { BacklogRepository } from './backlog.repository';
import { JiraClient } from './jira.client';
import { MockJiraClient } from './mock-jira.client';

@Module({
  providers: [
    BacklogResolver,
    BacklogService,
    BacklogRepository,
    {
      provide: JiraClient,
      useClass: process.env.MOCK_JIRA ? MockJiraClient : JiraClient,
    },
  ],
})
export class BacklogModule {}
