import { Test, TestingModule } from '@nestjs/testing';
import { MailingService } from './mailing.service';
import { MailingRepository } from './mailing.repository';
import { Mailing } from './schema/mailing.schema';

describe('MailingService', () => {
  let service: MailingService;
  let repository: MailingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailingService,
        {
          provide: MailingRepository,
          useValue: {
            createMailing: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MailingService>(MailingService);
    repository = module.get<MailingRepository>(MailingRepository);
  });

  describe('create', () => {
    it('should create a mailing', async () => {
      const mailingDto: Mailing = {
        name: '',
        email: '',
        phone: '',
        active: false,
      }; // Provide the necessary data for mailing
      const createdMailing: Mailing = {
        name: '',
        email: '',
        phone: '',
        active: false,
      }; // Define the expected return value

      (repository.createMailing as jest.Mock).mockResolvedValue(createdMailing);

      const result = await service.create(mailingDto);

      expect(result).toEqual(createdMailing);
      expect(repository.createMailing).toHaveBeenCalledWith(mailingDto);
    });
  });
});
