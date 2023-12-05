import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MailingRepository } from './mailing.repository';
import {
  Mailing,
  MailingDocument,
  MailingSchema,
} from './schema/mailing.schema';
import { ErrorMessages } from '../shared/messages/ErrorMessages';
import { MailingStatus } from '../shared/enums/mailing/MailingStatus';
import { Collection, connect, connection, model } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('MailingRepository', () => {
  const mailingModel = model<MailingDocument>('mailing', MailingSchema);

  let repository = new MailingRepository(mailingModel);

  let server: MongoMemoryServer;
  let collection: Collection;

  beforeAll(async () => {
    server = await MongoMemoryServer.create();

    await connect(server.getUri(), { dbName: 'test' });
    collection = connection.collection('mailing');
  });

  afterAll(async () => {
    await connection.destroy();
    await server.stop();
  });

  describe('Mailing', () => {
    it('should create a new mailing', async () => {
      const mailingDto: Mailing = {
        name: 'Jorlan',
        email: 'jorlan@gmail.com',
        phone: '31994566677',
      };
      const createdMailing = {
        ...mailingDto,
      };

      const result = await repository.createMailing(createdMailing);

      const created = await mailingModel
        .findOne({ email: createdMailing.email })
        .exec();

      expect(result.email).toEqual(created.email);
    });

    it('should throw a BadRequestException if an error occurs in create', async () => {
      const mailingDto: Mailing = {
        name: '',
        email: '',

        phone: '',
      };

      await expect(repository.createMailing(mailingDto)).rejects.toThrow(
        ErrorMessages.mailing.ERROR_CREATING_MAILING,
      );
    });

    it('should get all mailing', async () => {
      const mailingDto: Mailing = {
        name: 'naldo',
        email: 'naldo@gmail.com',
        phone: '31995556776',
      };

      await repository.createMailing(mailingDto);

      const result = await repository.findAll();

      expect(result.length).toEqual(2);
    });

    it('should throw a BadRequestException if an error occurs in get', async () => {
      const mailingDto: Mailing = {
        name: '',
        email: '',
        active: false,
        phone: '',
      };

      jest
        .spyOn(repository, 'findById')
        .mockRejectedValue(new Error(ErrorMessages.mailing.MAILING_NOT_FOUND));

      await expect(
        repository.findById(mailingDto._id as string),
      ).rejects.toThrow(ErrorMessages.mailing.MAILING_NOT_FOUND);
    });

    it('should test findByEmail', async () => {
      const mailingDto: Mailing = {
        name: 'Jorlanda',
        email: 'jorlan@gmail.com',
        phone: '31994566677',
      };
      const createdMailing = {
        ...mailingDto,
      };

      const result = await repository.findByEmail(createdMailing.email);

      const founded = await mailingModel
        .findOne({ email: createdMailing.email })
        .exec();

      expect(result.email).toEqual(founded.email);
    });
  });
});
