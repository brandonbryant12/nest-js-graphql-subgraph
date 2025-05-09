import { Injectable } from '@nestjs/common';
import { BacklogRepository, BacklogEntity, Issue } from './backlog.repository';

@Injectable()
export class BacklogService {
  constructor(private readonly repo: BacklogRepository) {}

  getBacklog(id: string): Promise<BacklogEntity | undefined> {
    return this.repo.findById(id);
  }

  getStories(backlog: BacklogEntity): Issue[] {
    return backlog.stories;
  }

  getEpics(backlog: BacklogEntity): Issue[] {
    return backlog.epics;
  }

  getBugs(backlog: BacklogEntity): Issue[] {
    return backlog.bugs;
  }
}
