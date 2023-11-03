import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MailingRepository } from './mailing.repository';
import { Mailing, MailingDocument } from './schema/mailing.schema';

const mockMailingModel = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

describe('MailingRepository', () => {
  let repository: MailingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingRepository,
        {
          provide: getModelToken(Mailing.name),
          useValue: mockMailingModel,
        },
      ],
    }).compile();

    repository = module.get<MailingRepository>(MailingRepository);
  });

  // Write your tests here...
});

describe('createMailing', () => {
  it('should create a new mailing', async () => {
    let repository: MailingRepository;
    const mailingDto: Mailing = {
      name: '',
      email: '',
      active: false,
    };
    const createdMailing = {
      /* provide the expected created mailing */
    };

    mockMailingModel.create.mockResolvedValue(createdMailing);

    const result = await repository.createMailing(mailingDto);

    expect(result).toEqual(createdMailing);
    expect(mockMailingModel.create).toHaveBeenCalledWith(mailingDto);
  });

  it('should throw a BadRequestException if an error occurs', async () => {
    let repository: MailingRepository;
    const mailingDto: Mailing = {
      name: '',
      email: '',
      active: false,
    };

    mockMailingModel.create.mockRejectedValue(
      new Error('Something went wrong'),
    );

    await expect(repository.createMailing(mailingDto)).rejects.toThrowError(
      'Bad Request Exception',
    );
  });
});
