import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';
import { MailingRepository } from './mailing.repository';
import { Mailing } from './schema/mailing.schema';

@Injectable()
export class MailingService {
  constructor(private readonly mailingRepository: MailingRepository) {}

  async create(createMailingDto: Mailing) {
    return await this.mailingRepository.createMailing(createMailingDto);
  }

  async findAll() {
    return await this.mailingRepository.findAll();
  }

  async findOne(id: string) {
    return await this.mailingRepository.findById(id);
  }

  async update(id: string, updateMailingDto: Mailing) {
    return await this.mailingRepository.update(updateMailingDto);
  }

  async remove(id: string) {
    return await this.mailingRepository.remove(id);
  }
}
