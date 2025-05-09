import axios, { AxiosInstance } from 'axios';
import { Injectable, Logger } from '@nestjs/common';

interface TokenCache {
  token: string | null;
  expiresAt: number; // epoch millis
}

@Injectable()
export class JiraClient {
  private readonly logger = new Logger(JiraClient.name);
  private readonly http: AxiosInstance;
  private cache: TokenCache = { token: null, expiresAt: 0 };

  constructor() {
    this.http = axios.create({
      baseURL: process.env.JIRA_BASE_URL,
    });
  }

  private async getAccessToken(): Promise<string> {
    const now = Date.now();
    if (this.cache.token && now < this.cache.expiresAt) {
      return this.cache.token;
    }
    const oauthUrl = process.env.OAUTH_URL!;
    const clientId = process.env.OAUTH_CLIENT_ID!;
    const clientSecret = process.env.OAUTH_CLIENT_SECRET!;
    const { data } = await axios.post(
      oauthUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    this.cache = {
      token: data.access_token,
      expiresAt: now + 55 * 60 * 1000, // 55 minutes
    };
    return data.access_token as string;
  }

  async fetchIssues(projectKey: string) {
    const token = await this.getAccessToken();
    const { data } = await this.http.post(
      '/issues',
      { projectKey },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return data.issues ?? [];
  }
}