import { Injectable } from '@nestjs/common';
import { TeamStructure } from './types';

@Injectable()
export class MockWorkforceClient {
  fetchTeamStructureById(id: string): Promise<TeamStructure | undefined> {
    const mockData: Record<string, TeamStructure> = {
      'example-website': {
        id: 'example-website',
        teamMembers: [
          { name: 'Alice', role: 'Developer' },
          { name: 'Bob', role: 'Lead' },
        ],
      },
      'app-2': {
        id: 'app-2',
        teamMembers: [
          { name: 'Charlie', role: 'Developer' },
          { name: 'David', role: 'QA' },
        ],
      },
    };

    return Promise.resolve(mockData[id]);
  }
}
