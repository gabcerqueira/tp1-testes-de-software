import { Injectable } from '@nestjs/common';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Injectable()
export class MailingService {
  create(createMailingDto: CreateMailingDto) {
    return 'This action adds a new mailing';
  }

  findAll() {
    return `This action returns all mailing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mailing`;
  }

  update(id: number, updateMailingDto: UpdateMailingDto) {
    return `This action updates a #${id} mailing`;
  }

  remove(id: number) {
    return `This action removes a #${id} mailing`;
  }
}
