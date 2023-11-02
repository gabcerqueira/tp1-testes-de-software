import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { CreateMailingDto } from './dto/create-mailing.dto';
import { UpdateMailingDto } from './dto/update-mailing.dto';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Post()
  create(@Body() createMailingDto: CreateMailingDto) {
    return this.mailingService.create(createMailingDto);
  }

  @Get()
  findAll() {
    return this.mailingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mailingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailingDto: UpdateMailingDto) {
    return this.mailingService.update(+id, updateMailingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mailingService.remove(+id);
  }
}
