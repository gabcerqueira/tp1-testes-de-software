import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Mailing } from './schema/mailing.schema';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Post()
  create(@Body() createMailingDto: Mailing) {
    return this.mailingService.create(createMailingDto);
  }

  @Get()
  findAll() {
    return this.mailingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailingDto: Mailing) {
    return this.mailingService.update(id, updateMailingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailingService.remove(id);
  }
}
