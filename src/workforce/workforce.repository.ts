import { Injectable } from '@nestjs/common';
import { MockWorkforceClient } from './mock-workforce.client';
import { TeamStructure } from './types';

export interface TeamStructureEntity {
  id: string;
  teamMembers: TeamMember[];
}

import { TeamMember } from './types';


@Injectable()
export class WorkforceRepository {
  constructor(private readonly workforceClient: MockWorkforceClient) {}

  async findById(id: string): Promise<TeamStructure | undefined> {
     const teamStructure = await this.workforceClient.fetchTeamStructureById(id);
     return teamStructure;
  }
}