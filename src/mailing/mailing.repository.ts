import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mailing, MailingDocument } from './schema/mailing.schema';
import { ErrorMessages } from '../shared/messages/ErrorMessages';
@Injectable()
export class MailingRepository {
  constructor(
    @InjectModel(Mailing.name) private mailingModel: Model<MailingDocument>,
  ) {}

  async createMailing(mailingDto: Mailing): Promise<Mailing> {
    try {
      const newMailing = new this.mailingModel({
        ...mailingDto,
      });
      return await newMailing.save();
    } catch (error) {
      throw new BadRequestException(
        ErrorMessages.mailing.ERROR_CREATING_MAILING,
      );
    }
  }

  async findAll() {
    try {
      const mailings: Array<Mailing> = await this.mailingModel
        .find()

        .exec();

      return mailings;
    } catch (error) {
      throw new BadRequestException(ErrorMessages.user.USERS_NOT_FOUND);
    }
  }

  async findByEmail(email: string): Promise<Mailing | null> {
    return this.mailingModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<Mailing | null> {
    try {
      return this.mailingModel.findById(id).exec();
    } catch (error) {
      throw new BadRequestException(ErrorMessages.mailing.MAILING_NOT_FOUND);
    }
  }

  async update(userDto: Mailing): Promise<Mailing | null> {
    return this.mailingModel
      .findByIdAndUpdate(userDto._id, userDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<boolean> {
    try {
      let user: Mailing | null = await this.mailingModel
        .findByIdAndDelete(id)
        .exec();

      if (!user) {
        throw new Error(ErrorMessages.user.ERROR_DELETING_USER);
      }

      return !!user;
    } catch (error) {
      throw new BadRequestException(error.message);
      return false;
    }
  }
}
