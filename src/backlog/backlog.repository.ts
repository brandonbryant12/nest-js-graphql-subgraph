import { Injectable } from '@nestjs/common';
import { JiraClient } from './jira.client';
import { IssueSummary } from './types';

export interface BacklogEntity {
  id: string;
  issueSummaries: IssueSummary[];
}

@Injectable()
export class BacklogRepository {
  constructor(private readonly jira: JiraClient) {}

  async findById(projectKey: string): Promise<BacklogEntity | undefined> {
    const issueSummaries =
      await this.jira.fetchIssueSummariesByProject(projectKey);
    return { id: projectKey, issueSummaries };
  }
}
