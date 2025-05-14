import { Injectable } from '@nestjs/common';
import { WorkforceRepository } from './workforce.repository';
import { ApplicationTeam, Associate } from './types';

@Injectable()
export class WorkforceService {
  constructor(private readonly repo: WorkforceRepository) {}

  getApplicationTeamById(id: string): Promise<ApplicationTeam | undefined> {
    return this.repo.findById(id);
  }

  getAssociates(applicationTeam: ApplicationTeam): Associate[] {
    return applicationTeam.associates;
  }
}
