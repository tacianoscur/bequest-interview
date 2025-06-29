import { Module } from '@nestjs/common';
import { DocumentController } from '../controllers/document.controller';
import { DocumentRepository } from '../repositories/document.repository';

@Module({
  imports: [],
  controllers: [DocumentController],
  providers: [DocumentRepository],
})
export class DocumentModule {}
