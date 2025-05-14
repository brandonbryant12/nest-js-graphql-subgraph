import { Injectable } from '@nestjs/common';
import { JiraClient } from './jira.client';
import { IssueSummary } from './types';

export interface BacklogEntity {
  id: string;
  issueSummaries: IssueSummary[];
  backlogUrl: string;
}

@Injectable()
export class BacklogRepository {
  constructor(private readonly jira: JiraClient) {}

  async findById(projectKey: string): Promise<BacklogEntity | undefined> {
    const issueSummaries =
      await this.jira.fetchIssueSummariesByProject(projectKey);
    const backlogUrl = this.jira.getBacklogUrl(projectKey);
    return { id: projectKey, issueSummaries, backlogUrl };
  }
}
