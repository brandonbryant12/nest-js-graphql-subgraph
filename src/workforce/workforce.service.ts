import { Injectable } from '@nestjs/common';
import { WorkforceRepository } from './workforce.repository';
import { TeamStructure, TeamMember } from './types';

@Injectable()
export class WorkforceService {
  constructor(private readonly repo: WorkforceRepository) {}

  getTeamStructureById(id: string): Promise<TeamStructure | undefined> {
    return this.repo.findById(id);
  }

  getTeamMembers(teamStructure: TeamStructure): TeamMember[] {
    return teamStructure.teamMembers;
  }
}