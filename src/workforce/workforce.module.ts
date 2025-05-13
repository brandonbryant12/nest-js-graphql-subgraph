import { Module } from '@nestjs/common';
import { WorkforceService } from './workforce.service';
import { WorkforceRepository } from './workforce.repository';
import { MockWorkforceClient } from './mock-workforce.client';
import { TeamStructureResolver, ApplicationResolver, WorkforceQueryResolver } from './workforce.resolver';

@Module({
  providers: [
    WorkforceService,
    WorkforceRepository,
    MockWorkforceClient,
    TeamStructureResolver,
    ApplicationResolver,
    WorkforceQueryResolver,
  ],
})
export class WorkforceModule {}