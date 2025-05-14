import { Injectable } from '@nestjs/common';
import { MockWorkforceClient } from './mock-workforce.client';
import { ApplicationTeam } from './types';

@Injectable()
export class WorkforceRepository {
  constructor(private readonly workforceClient: MockWorkforceClient) {}

  async findById(id: string): Promise<ApplicationTeam | undefined> {
    const applicationTeam = await this.workforceClient.fetchApplicationTeam(id);
    return applicationTeam;
  }
}
