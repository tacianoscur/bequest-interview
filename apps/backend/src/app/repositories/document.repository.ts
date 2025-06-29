import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database';

@Injectable()
export class DocumentRepository {
  constructor(private readonly database: DatabaseService) {}

  async getLastSaved() {
    return await this.database.document.findFirst({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  async create(data: { fileName: string; mimeType: string; data: string }) {
    return await this.database.document.create({
      data,
    });
  }

  async findById(id: number) {
    return await this.database.document.findUnique({
      where: { id },
    });
  }

  async updateById(
    id: number,
    data: {
      fileName?: string;
      mimeType?: string;
      data: string;
    }
  ) {
    return await this.database.document.update({
      where: { id },
      data,
    });
  }
}
