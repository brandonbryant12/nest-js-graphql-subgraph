import { Injectable } from '@nestjs/common';
import { JiraClient } from './jira.client';

export interface Issue {
  name: string;
  iconUrl: string;
}

export interface BacklogEntity {
  id: string;
  stories: Issue[];
  epics: Issue[];
  bugs: Issue[];
}

@Injectable()
export class BacklogRepository {
  constructor(private readonly jira: JiraClient) {}

  async findById(projectKey: string): Promise<BacklogEntity | undefined> {
    const rawIssues = await this.jira.fetchIssues(projectKey);
    if (!rawIssues.length) return undefined;

    const toIssue = (i: any): Issue => ({
      name: i.fields?.summary ?? i.key,
      iconUrl: i.fields?.issuetype?.iconUrl ?? '',
    });

    const stories = rawIssues
      .filter((i: any) => i.fields?.issuetype?.name === 'Story')
      .map(toIssue);
    const epics = rawIssues
      .filter((i: any) => i.fields?.issuetype?.name === 'Epic')
      .map(toIssue);
    const bugs = rawIssues
      .filter((i: any) => i.fields?.issuetype?.name === 'Bug')
      .map(toIssue);

    return { id: projectKey, stories, epics, bugs };
  }
}