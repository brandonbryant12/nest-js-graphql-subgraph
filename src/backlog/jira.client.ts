import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Injectable, Logger } from '@nestjs/common';

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
  private readonly http: AxiosInstance;
  private cache: TokenCache = { token: null, expiresAt: 0 };

  constructor() {
    const jiraBaseUrl = process.env.JIRA_BASE_URL as string;
    if (!jiraBaseUrl) {
      this.logger.error('JIRA_BASE_URL environment variable is not set.');
      throw new Error('JIRA_BASE_URL environment variable is not set.');
    }
    this.http = axios.create({ baseURL: jiraBaseUrl });
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

    const tokenResp: AxiosResponse<AccessTokenResponse> =
      await axios.post<AccessTokenResponse>(
        oauthUrl,
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: clientId,
          client_secret: clientSecret,
        }),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
    const { access_token } = tokenResp.data;
    this.cache = { token: access_token, expiresAt: now + 55 * 60 * 1000 };
    return access_token;
  }

  async fetchIssues(projectKey: string): Promise<JiraIssue[]> {
    const token = await this.getAccessToken();
    const issuesResp: AxiosResponse<SearchIssuesResponse> =
      await this.http.post<SearchIssuesResponse>(
        '/issues',
        { projectKey },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    return issuesResp.data.issues ?? [];
  }
}