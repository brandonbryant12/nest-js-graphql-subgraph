import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';
import { BacklogService } from './backlog.service';
import { BacklogEntity } from './backlog.repository';
import { IssueSummary } from './types';

@Resolver('Backlog')
export class BacklogResolver {
  constructor(private readonly backlogService: BacklogService) {}

  @ResolveField('issueSummaries')
  issueSummaries(@Parent() backlog: BacklogEntity): IssueSummary[] {
    return this.backlogService.getIssueSummaries(backlog);
  }

  @Query('backlog')
  async backlogById(
    @Args('id') id: string,
  ): Promise<BacklogEntity | undefined> {
    return this.backlogService.getBacklog(id);
  }
}

@Resolver('Application')
export class ApplicationResolver {
  constructor(private readonly backlogService: BacklogService) {}

  backlog(
    @Parent() application: { agileEntityName?: string },
  ): Promise<BacklogEntity | undefined> {
    if (!application.agileEntityName) {
      return undefined as any;
    }
    return this.backlogService.getBacklog(application.agileEntityName);
  }
}
