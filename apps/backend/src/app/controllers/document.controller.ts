import 'multer';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DocumentRepository } from '../repositories/document.repository';
import { Document } from '../../database/prisma/client';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentRepository: DocumentRepository) {}

  @Post()
  async createDocument(@Body() body: { data: string }): Promise<Document> {
    if (!body.data) {
      throw new HttpException('No content provided!', HttpStatus.BAD_REQUEST);
    }

    const document = await this.documentRepository.create({
      fileName: 'autosave.sfdt',
      mimeType: 'application/json',
      data: body.data,
    });

    return document;
  }

  @Put(':id')
  async updateDocument(
    @Param('id') id: string,
    @Body() body: { data: string }
  ): Promise<Document> {
    if (!body.data) {
      throw new HttpException('No content provided!', HttpStatus.BAD_REQUEST);
    }

    const documentId = Number(id);

    const document = await this.documentRepository.findById(documentId);

    if (!document) {
      throw new HttpException(
        'Document with id provided not found!',
        HttpStatus.NOT_FOUND
      );
    }

    const documentUpdated = await this.documentRepository.updateById(
      documentId,
      {
        data: body.data,
      }
    );

    return documentUpdated;
  }

  @Get('saved')
  async getLastSavedDocument(): Promise<Document | null> {
    return await this.documentRepository.getLastSaved();
  }
}
