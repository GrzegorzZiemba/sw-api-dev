import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmCache } from './film-cache.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import axios from 'axios';
import { NotFoundException, HttpException } from '@nestjs/common';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('FilmsService', () => {
  let service: FilmsService;
  let mockFilmCacheRepository;

  beforeEach(async () => {
    mockFilmCacheRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: getRepositoryToken(FilmCache),
          useValue: mockFilmCacheRepository,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should save a film to cache if not found in cache and found in API', async () => {
    mockFilmCacheRepository.findOne.mockResolvedValue(null);
    const filmData = { episode_id: '1', title: 'Test Film', opening_crawl: 'Test Opening Crawl' };
    mockedAxios.get.mockResolvedValue({ data: filmData });
  
    await service.findOneById(1);
  
    expect(mockFilmCacheRepository.save).toHaveBeenCalledWith({
      filmId: 'film-1',
      data: expect.anything(), // Możesz tutaj użyć bardziej szczegółowego sprawdzenia
      lastFetched: expect.any(Date),
    });
  });

it('should return a film if it is found in cache', async () => {
  const cachedFilm = { id: '1', title: 'Test Film', openingCrawl: 'Test Opening Crawl' };
  mockFilmCacheRepository.findOne.mockResolvedValue({ data: cachedFilm });

  const result = await service.findOneById(1);
  expect(result).toEqual(cachedFilm);
});

  

  it('should throw NotFoundException if film is not found', async () => {
    mockFilmCacheRepository.findOne.mockResolvedValue(null);
    mockedAxios.get.mockRejectedValue({ response: { status: 404 } });
  
    await expect(service.findOneById(1)).rejects.toThrow(NotFoundException);
  });
  

});