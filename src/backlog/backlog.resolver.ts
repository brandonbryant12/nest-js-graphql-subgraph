import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  ResolveReference,
} from '@nestjs/graphql';
import { BacklogService } from './backlog.service';
import { BacklogEntity, Issue } from './backlog.repository';

@Resolver('Backlog')
export class BacklogResolver {
  constructor(private readonly backlogService: BacklogService) {}

  @Query('backlog')
  getBacklog(@Args('id') id: string): Promise<BacklogEntity | undefined> {
    return this.backlogService.getBacklog(id);
  }

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

  @ResolveReference()
  async resolveReference(ref: {
    __typename: string;
    id: string;
  }): Promise<BacklogEntity | undefined> {
    return await this.backlogService.getBacklog(ref.id);
  }
}
