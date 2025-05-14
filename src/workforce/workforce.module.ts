import { Module } from '@nestjs/common';
import { WorkforceService } from './workforce.service';
import { WorkforceRepository } from './workforce.repository';
import { MockWorkforceClient } from './mock-workforce.client';
import {
  ApplicationTeamResolver,
  ApplicationResolver,
  WorkforceQueryResolver,
} from './workforce.resolver';

@Module({
  providers: [
    WorkforceService,
    WorkforceRepository,
    MockWorkforceClient,
    ApplicationTeamResolver,
    ApplicationResolver,
    WorkforceQueryResolver,
  ],
})
export class WorkforceModule {}
