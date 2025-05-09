import { Module } from '@nestjs/common';
import { BacklogResolver } from './backlog.resolver';
import { BacklogService } from './backlog.service';
import { BacklogRepository } from './backlog.repository';
import { JiraClient } from './jira.client';

@Module({
  providers: [BacklogResolver, BacklogService, BacklogRepository, JiraClient],
})
export class BacklogModule {}