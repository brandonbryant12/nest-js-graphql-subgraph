import { Injectable } from '@nestjs/common';
import { BacklogRepository, BacklogEntity } from './backlog.repository';
import { IssueSummary } from './types';

@Injectable()
export class BacklogService {
  constructor(private readonly repo: BacklogRepository) {}

  getBacklog(id: string): Promise<BacklogEntity | undefined> {
    return this.repo.findById(id);
  }

  getIssueSummaries(backlog: BacklogEntity): IssueSummary[] {
    return backlog.issueSummaries;
  }
}
