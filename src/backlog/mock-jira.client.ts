import { Injectable } from '@nestjs/common';
import { IssueSummary } from './types';

@Injectable()
export class MockJiraClient {
  // eslint-disable-next-line @typescript-eslint/require-await
  async fetchIssueSummariesByProject(
    projectKey: string,
  ): Promise<IssueSummary[]> {
    return [
      {
        name: 'Story',
        iconUrl: `https://mock-jira.com/${projectKey}/icons/story.png`,
        count: '15',
      },
      {
        name: 'Bug',
        iconUrl: `https://mock-jira.com/${projectKey}/icons/bug.png`,
        count: '7',
      },
      {
        name: 'Task',
        iconUrl: `https://mock-jira.com/${projectKey}/icons/task.png`,
        count: '10',
      },
    ];
  }
  getBacklogUrl(projectKey: string) {
    return `https://jira.example.com/${projectKey}`;
  }
}
