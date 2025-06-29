import { Module, Global } from '@nestjs/common';
import { DatabaseService } from '../../database';

@Global()
@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
