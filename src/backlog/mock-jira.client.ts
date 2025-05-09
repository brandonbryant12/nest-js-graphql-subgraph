import { Injectable } from '@nestjs/common';
import { JiraIssue } from './jira.client';

@Injectable()
export class MockJiraClient {
  // eslint-disable-next-line @typescript-eslint/require-await
  async fetchIssues(projectKey: string): Promise<JiraIssue[]> {
    return [
      {
        key: `${projectKey}-1`,
        fields: {
          summary: 'Mock Story',
          issuetype: {
            name: 'Story',
            iconUrl: 'https://example.com/story.png',
          },
        },
      },
      {
        key: `${projectKey}-2`,
        fields: {
          summary: 'Mock Epic',
          issuetype: { name: 'Epic', iconUrl: 'https://example.com/epic.png' },
        },
      },
      {
        key: `${projectKey}-3`,
        fields: {
          summary: 'Mock Bug',
          issuetype: { name: 'Bug', iconUrl: 'https://example.com/bug.png' },
        },
      },
    ];
  }
}
