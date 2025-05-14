import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';
import { WorkforceService } from './workforce.service';
import { ApplicationTeam, Associate } from './types';

@Resolver('ApplicationTeam')
export class ApplicationTeamResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @ResolveField('associates')
  teamMembers(@Parent() applicationTeam: ApplicationTeam): Associate[] {
    return this.workforceService.getAssociates(applicationTeam);
  }
}

@Resolver('Application')
export class ApplicationResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @ResolveField('team')
  team(
    @Parent() application: { id: string },
  ): Promise<ApplicationTeam | undefined> {
    return this.workforceService.getApplicationTeamById(application.id);
  }
}

@Resolver()
export class WorkforceQueryResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @Query('applicationTeam')
  async applicationTeam(
    @Args('id') id: string,
  ): Promise<ApplicationTeam | undefined> {
    return this.workforceService.getApplicationTeamById(id);
  }
}
