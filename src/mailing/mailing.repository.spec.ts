import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MailingRepository } from './mailing.repository';
import { Mailing } from './schema/mailing.schema';
import { ErrorMessages } from '../shared/messages/ErrorMessages';
import { MailingStatus } from '../shared/enums/mailing/MailingStatus';

describe('MailingRepository', () => {
  let repository: MailingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingRepository,
        {
          provide: getModelToken(Mailing.name),
          useValue: {},
        },
      ],
    }).compile();

    repository = module.get<MailingRepository>(MailingRepository);
  });

  describe('createMailing', () => {
    it('should create a new mailing', async () => {
      const mailingDto: Mailing = {
        name: 'Jorlan',
        email: 'jorlan@gmail.com',
        phone: '31994566677',
      };
      const createdMailing = {
        ...mailingDto,
      };

      jest.spyOn(repository, 'createMailing').mockResolvedValue(createdMailing);

      const result = await repository.createMailing(mailingDto);

      expect(result.email).toEqual(createdMailing.email);
    });

    it('should throw a BadRequestException if an error occurs in create', async () => {
      const mailingDto: Mailing = {
        name: '',
        email: '',
        active: false,
        phone: '',
      };

      jest
        .spyOn(repository, 'createMailing')
        .mockRejectedValue(
          new Error(ErrorMessages.mailing.ERROR_CREATING_MAILING),
        );

      await expect(repository.createMailing(mailingDto)).rejects.toThrow(
        ErrorMessages.mailing.ERROR_CREATING_MAILING,
      );
    });

    it('should get a mailing', async () => {
      const mailingDto: Mailing = {
        _id: '654521ebf89b4d9dee2e1e2d',
        name: 'naldo',
        email: 'naldo@gmail.com',
        phone: '31995556776',
        status: MailingStatus.NEW,
        active: true,
      };
      const createdMailing = {
        ...mailingDto,
      };

      jest.spyOn(repository, 'findById').mockResolvedValue(createdMailing);

      const result = await repository.findById(mailingDto._id as string);

      expect(result.email).toEqual(createdMailing.email);
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
  });
});
