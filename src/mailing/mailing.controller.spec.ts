import { Test, TestingModule } from '@nestjs/testing';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { Mailing } from './schema/mailing.schema';
import { MailingRepository } from './mailing.repository';
import { ErrorMessages } from '../shared/messages/ErrorMessages';

describe('MailingController', () => {
  let controller: MailingController;
  let service: MailingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [mailingModel],
      controllers: [MailingController],
      providers: [
        MailingService,
        {
          provide: MailingRepository, // Provide the repository
          useValue: {}, // You can mock this if needed
        },
      ],
    }).compile();

    controller = module.get<MailingController>(MailingController);
    service = module.get<MailingService>(MailingService);
  });

  it('should create a mailing', async () => {
    const mailing: Mailing = {
      name: 'Arthur Moreira',
      email: 'art@gmail.com',
      active: false,
      phone: '31994345555',
    };

    jest.spyOn(service, 'create').mockResolvedValue(mailing);

    const result = await controller.create(mailing);

    expect(result).toEqual(mailing);
  });

  it('should throw a BadRequestException if an error occurs in create', async () => {
    const mailingDto: Mailing = {
      name: '',
      email: '',
      active: false,
      phone: '',
    };

    jest
      .spyOn(service, 'create')
      .mockRejectedValue(
        new Error(ErrorMessages.mailing.ERROR_CREATING_MAILING),
      );

    await expect(service.create(mailingDto)).rejects.toThrow(
      ErrorMessages.mailing.ERROR_CREATING_MAILING,
    );
  });

  it('should throw a BadRequestException if an error occurs in findAll', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockRejectedValue(
        new Error(ErrorMessages.mailing.ERROR_FINDING_MAILINGS),
      );

    await expect(service.findAll()).rejects.toThrow(
      ErrorMessages.mailing.ERROR_FINDING_MAILINGS,
    );
  });

  it('should throw a BadRequestException if an error occurs in remove', async () => {
    const id = 'id';
    jest
      .spyOn(service, 'remove')
      .mockRejectedValue(
        new Error(ErrorMessages.mailing.ERROR_REMOVING_MAILING),
      );

    await expect(service.remove(id)).rejects.toThrow(
      ErrorMessages.mailing.ERROR_REMOVING_MAILING,
    );
  });

  it('should throw a BadRequestException if an error occurs in findOne', async () => {
    const id = 'id';
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(
        new Error(ErrorMessages.mailing.ERROR_FINDING_MAILING),
      );

    await expect(service.findOne(id)).rejects.toThrow(
      ErrorMessages.mailing.ERROR_FINDING_MAILING,
    );
  });

  it('should throw a BadRequestException if an error occurs in update', async () => {
    const mailingDto: Mailing = {
      _id: 'id',
      name: '',
      email: '',
      active: false,
      phone: '',
    };

    jest
      .spyOn(service, 'update')
      .mockRejectedValue(
        new Error(ErrorMessages.mailing.ERROR_UPDATING_MAILING),
      );

    await expect(
      service.update(mailingDto._id as string, mailingDto),
    ).rejects.toThrow(ErrorMessages.mailing.ERROR_UPDATING_MAILING);
  });

  it('should get all mailings', async () => {
    const mailings: Mailing[] = [
      {
        name: 'Arthur Moreira',
        email: 'art@gmail.com',
        active: false,
        phone: '31994345555',
      },
      {
        name: 'Arthur Moreira',
        email: 'art@gmail.com',
        active: false,
        phone: '31994345555',
      },
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(mailings as never);

    const result = await controller.findAll();

    expect(result).toEqual(mailings);
  });

  it('should get a mailing by id', async () => {
    const id = 'some-id';
    const mailing: Mailing = {
      name: '',
      email: '',
      active: false,
      phone: '31994345555',
    };

    jest.spyOn(service, 'findOne').mockResolvedValue(mailing);

    const result = await controller.findOne(id);

    expect(result).toEqual(mailing);
  });

  it('should update a mailing', async () => {
    const id = 'some-id';
    const updatedMailing: Mailing = {
      name: '',
      email: '',
      active: false,
      phone: '',
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedMailing);

    const result = await controller.update(id, updatedMailing);

    expect(result).toEqual(updatedMailing);
  });

  it('should remove a mailing', async () => {
    const id = 'some-id';

    jest.spyOn(service, 'remove').mockResolvedValue(true);

    const result = await controller.remove(id);

    expect(result).toBe(true);
  });
});
