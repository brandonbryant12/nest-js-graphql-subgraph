import { Resolver, ResolveField, Parent, Query, Args } from '@nestjs/graphql';
import { WorkforceService } from './workforce.service';
import { TeamStructure, TeamMember } from './types';

@Resolver('TeamStructure')
export class TeamStructureResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @ResolveField('teamMembers')
  teamMembers(@Parent() teamStructure: TeamStructure): TeamMember[] {
    return this.workforceService.getTeamMembers(teamStructure);
  }
}

@Resolver('Application')
export class ApplicationResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @ResolveField('team')
  team(
    @Parent() application: { id: string },
  ): Promise<TeamStructure | undefined> {
    return this.workforceService.getTeamStructureById(application.id);
  }
}

@Resolver()
export class WorkforceQueryResolver {
  constructor(private readonly workforceService: WorkforceService) {}

  @Query('team')
  async teamById(@Args('id') id: string): Promise<TeamStructure | undefined> {
    return this.workforceService.getTeamStructureById(id);
  }
}
