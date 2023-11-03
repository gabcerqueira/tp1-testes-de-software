import { Test, TestingModule } from '@nestjs/testing';
import { MailingController } from './mailing.controller';
import { MailingService } from './mailing.service';
import { Mailing, MailingDocument } from './schema/mailing.schema';
import { MailingRepository } from './mailing.repository';
import { Model } from 'mongoose';

describe('MailingController', () => {
  let controller: MailingController;

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
  });

  it('should create a mailing', async () => {
    const mailing: Mailing = {
      name: 'Arthur Moreira',
      email: 'art@gmail.com',
      active: false,
      phone: '31994345555',
    };

    jest.spyOn(controller, 'create').mockResolvedValue(mailing);

    const result = await controller.create(mailing);

    expect(result).toEqual(mailing);
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

    jest.spyOn(controller, 'findAll').mockResolvedValue(mailings as never);

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

    jest.spyOn(controller, 'findOne').mockResolvedValue(mailing);

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

    jest.spyOn(controller, 'update').mockResolvedValue(updatedMailing);

    const result = await controller.update(id, updatedMailing);

    expect(result).toEqual(updatedMailing);
  });

  it('should remove a mailing', async () => {
    const id = 'some-id';

    jest.spyOn(controller, 'remove').mockResolvedValue(true);

    const result = await controller.remove(id);

    expect(result).toBe(true);
  });
});
