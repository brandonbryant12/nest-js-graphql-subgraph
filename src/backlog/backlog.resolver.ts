import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { BacklogService } from './backlog.service';
import { BacklogEntity, Issue } from './backlog.repository';

@Resolver('Backlog')
export class BacklogResolver {
  constructor(private readonly backlogService: BacklogService) {}

  @ResolveField('stories')
  stories(@Parent() backlog: BacklogEntity): Issue[] {
    return this.backlogService.getStories(backlog);
  }

  @ResolveField('epics')
  epics(@Parent() backlog: BacklogEntity): Issue[] {
    return this.backlogService.getEpics(backlog);
  }

  @ResolveField('bugs')
  bugs(@Parent() backlog: BacklogEntity): Issue[] {
    return this.backlogService.getBugs(backlog);
  }
}

@Resolver('Application')
export class ApplicationResolver {
  constructor(private readonly backlogService: BacklogService) {}

  @ResolveField('backlog')
  async backlog(
    @Parent() application: { agileEntityName?: string },
  ): Promise<BacklogEntity | undefined> {
    if (!application.agileEntityName) {
      return undefined;
    }
    return this.backlogService.getBacklog(application.agileEntityName);
  }
}
