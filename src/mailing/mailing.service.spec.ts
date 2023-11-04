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

  describe('findAll', () => {
    it('should return all mailings', async () => {
      const allMailings: Mailing[] = [
        // Provide sample mailings
      ];

      (repository.findAll as jest.Mock).mockResolvedValue(allMailings);

      const result = await service.findAll();

      expect(result).toEqual(allMailings);
      expect(repository.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a mailing by id', async () => {
      const mailingId = 'someId';
      const foundMailing: Mailing = {
        name: 'Junior',
        email: 'junior@gmail.com',
        phone: '31994638076',
      };

      (repository.findById as jest.Mock).mockResolvedValue(foundMailing);

      const result = await service.findOne(mailingId);

      expect(result).toEqual(foundMailing);
      expect(repository.findById).toHaveBeenCalledWith(mailingId);
    });
  });

  describe('update', () => {
    it('should update a mailing', async () => {
      const mailingId = 'someId';
      const updateMailingDto: Mailing = {
        name: 'Junior',
        email: 'junior@gmail.com',
        phone: '31994638076',
      };
      const updatedMailing: Mailing = {
        name: 'Adalto',
        email: 'Adalto@gmail.com',
        phone: '31994638076',
      };

      (repository.update as jest.Mock).mockResolvedValue(updatedMailing);

      const result = await service.update(mailingId, updateMailingDto);

      expect(result).toEqual(updatedMailing);
    });
  });

  describe('remove', () => {
    it('should remove a mailing', async () => {
      const mailingId = 'someId';
      const isRemoved = true;

      (repository.remove as jest.Mock).mockResolvedValue(isRemoved);

      const result = await service.remove(mailingId);

      expect(result).toEqual(isRemoved);
      //expect(repository.remove).toHaveBeenCalledWith(mailingId);
    });
  });
});
