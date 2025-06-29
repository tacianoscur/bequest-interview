import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DatabaseModule } from './database.module';
import { DocumentModule } from './document.module';

@Module({
  imports: [DatabaseModule, DocumentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
