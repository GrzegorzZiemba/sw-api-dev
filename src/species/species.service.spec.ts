import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { SpeciesCache } from './species-cache.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import axios from 'axios';
import { NotFoundException, HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SpeciesService', () => {
  let service: SpeciesService;
  let mockSpeciesCacheRepository;

  beforeEach(async () => {
    mockSpeciesCacheRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        {
          provide: getRepositoryToken(SpeciesCache),
          useValue: mockSpeciesCacheRepository,
        },
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should fetch and cache species if not in cache', async () => {
    mockSpeciesCacheRepository.findOne.mockResolvedValue(null);
    const speciesData = { results: [{ name: 'Test Species', url: 'https://swapi.dev/api/species/1/' }] };
    mockedAxios.get.mockResolvedValue({ data: speciesData });

    const result = await service.findAll(1);

    expect(mockSpeciesCacheRepository.save).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual([{ id: '1', name: 'Test Species', url: 'https://swapi.dev/api/species/1/' }]);
  });



  it('should fetch and cache a specific species by ID if not in cache', async () => {
    mockSpeciesCacheRepository.findOne.mockResolvedValue(null);
    const speciesData = { name: 'Test Species', url: 'https://swapi.dev/api/species/1/' };
    mockedAxios.get.mockResolvedValue({ data: speciesData });

    const result = await service.findOneById(1);

    expect(mockSpeciesCacheRepository.save).toHaveBeenCalledWith(expect.anything());
    expect(result).toEqual({ id: '1', name: 'Test Species', url: 'https://swapi.dev/api/species/1/' });
  });

  it('should throw NotFoundException if species is not found by ID', async () => {
    mockSpeciesCacheRepository.findOne.mockResolvedValue(null);
    mockedAxios.get.mockRejectedValue({ response: { status: 404 } });

    await expect(service.findOneById(999)).rejects.toThrow(NotFoundException);
  });
});
