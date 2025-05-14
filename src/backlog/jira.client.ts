import { Injectable, Logger } from '@nestjs/common';
import { IssueSummary } from './types';
interface TokenCache {
  token: string | null;
  expiresAt: number;
}

export interface JiraIssue {
  key: string;
  fields?: {
    summary?: string;
    issuetype?: {
      name?: string;
      iconUrl?: string;
    };
  };
}

interface SearchIssuesResponse {
  issues?: JiraIssue[];
}

interface AccessTokenResponse {
  access_token: string;
  expires_in?: number;
  token_type?: string;
}

@Injectable()
export class JiraClient {
  private readonly logger = new Logger(JiraClient.name);
  private cache: TokenCache = { token: null, expiresAt: 0 };

  constructor() {
    const jiraBaseUrl = process.env.JIRA_BASE_URL as string;
    if (!jiraBaseUrl) {
      this.logger.error('JIRA_BASE_URL environment variable is not set.');
      throw new Error('JIRA_BASE_URL environment variable is not set.');
    }
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.cache.token && now < this.cache.expiresAt) {
      return this.cache.token;
    }
    const oauthUrl = process.env.OAUTH_URL!;
    const clientId = process.env.OAUTH_CLIENT_ID!;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET!;

    if (!oauthUrl || !clientId || !clientSecret) {
      this.logger.error('OAuth environment variables are not fully set.');
      throw new Error('OAuth environment variables are not fully set.');
    }

    const response = await fetch(oauthUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(
        `Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`,
      );
      throw new Error(
        `Failed to get access token: ${response.status} ${response.statusText}`,
      );
    }

    const data: AccessTokenResponse = await response.json();

    const { access_token } = data;
    this.cache = { token: access_token, expiresAt: now + 55 * 60 * 1000 };
    return access_token;
  }

  async fetchIssueSummariesByProject(
    projectKey: string,
  ): Promise<IssueSummary[]> {
    const token = await this.getAccessToken();
    const jiraBaseUrl = process.env.JIRA_BASE_URL as string;
    const jql = `project = "${projectKey}" AND statusCategory != Done`;

    const response = await fetch(`${jiraBaseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        jql,
        maxResults: 500,
        fields: ['issuetype'],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      this.logger.error(
        `Failed to fetch issue summaries: ${response.status} ${response.statusText} - ${errorText}`,
      );
      throw new Error(
        `Failed to fetch issue summaries: ${response.status} ${response.statusText}`,
      );
    }

    const data: SearchIssuesResponse = await response.json();
    const rawIssues = data.issues ?? [];

    if (!rawIssues.length) {
      return [];
    }

    const groupedIssues = rawIssues.reduce(
      (acc, issue) => {
        const typeName = issue.fields?.issuetype?.name;
        if (typeName) {
          if (!acc[typeName]) {
            acc[typeName] = {
              iconUrl: issue.fields?.issuetype?.iconUrl,
              issues: [],
            };
          }
          acc[typeName].issues.push(issue);
        }
        return acc;
      },
      {} as Record<string, { iconUrl?: string; issues: JiraIssue[] }>,
    );

    const issueSummaries: IssueSummary[] = Object.entries(groupedIssues).map(
      ([name, groupData]) => ({
        name,
        iconUrl: groupData.iconUrl,
        count: groupData.issues.length.toString(),
      }),
    );

    return issueSummaries;
  }

  getBacklogUrl(projectKey: string) {
    return `https://jira.example.com/${projectKey}`;
  }
}
