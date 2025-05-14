import { Injectable } from '@nestjs/common';
import { ApplicationTeam } from './types';

@Injectable()
export class MockWorkforceClient {
  fetchApplicationTeam(id: string): Promise<ApplicationTeam> {
    return Promise.resolve({
      id,
      associates: [
        {
          name: 'Alice',
          role: 'Developer',
          description: '',
          email: 'alice@example.com',
          imageUrl: 'https://example.com/alice.jpg',
          link: '',
        },
        {
          name: 'Bob',
          role: 'Lead',
          description: '',
          email: 'bob@example.com',
          imageUrl: 'https://example.com/bob.jpg',
          link: '',
        },
      ],
    });
  }
}
