import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Mailing } from './schema/mailing.schema';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

@Controller('mailing')
export class MailingController {
  constructor(private readonly mailingService: MailingService) {}

  @Post()
  create(@Body() createMailingDto: Mailing) {
    try {
      return this.mailingService.create(createMailingDto);
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_CREATING_MAILING,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.mailingService.findAll();
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_FINDING_MAILINGS,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.mailingService.findOne(id);
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_FINDING_MAILING,
      );
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMailingDto: Mailing) {
    try {
      return this.mailingService.update(id, updateMailingDto);
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_UPDATING_MAILING,
      );
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.mailingService.remove(id);
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_REMOVING_MAILING,
      );
    }
  }
}
