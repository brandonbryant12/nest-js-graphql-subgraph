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
        issueName: 'Story',
        issueIconUrl: `https://mock-jira.com/${projectKey}/icons/story.png`,
        activeIssueCount: '15',
      },
      {
        issueName: 'Bug',
        issueIconUrl: `https://mock-jira.com/${projectKey}/icons/bug.png`,
        activeIssueCount: '7',
      },
      {
        issueName: 'Task',
        issueIconUrl: `https://mock-jira.com/${projectKey}/icons/task.png`,
        activeIssueCount: '10',
      },
    ];
  }
}
