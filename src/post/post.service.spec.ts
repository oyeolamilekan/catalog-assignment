import { Post } from './entities/post.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  const mockPostRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    update: jest.fn().mockImplementation((dto) => dto),
    remove: jest.fn().mockImplementation((dto) => dto),
    findOne: jest.fn().mockImplementation((dto) => dto),
    findAll: jest
      .fn()
      .mockImplementation(() => [
        { title: 'oye', description: 'oyelamilekan' },
      ]),
    save: jest.fn().mockImplementation((post) => Promise.resolve({ ...post })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
      ],
    }).compile();

    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(
      await service.create({
        title: 'Oye is handsome',
        description: 'very good looking fellow',
      }),
    ).toEqual({
      title: 'Oye is handsome',
      description: 'very good looking fellow',
    });
  });

  it("should get all post",async () => {
    expect(
      await service.create({
        title: 'Oye is handsome',
        description: 'very good looking fellow',
      }),
    ).toEqual({
      title: 'Oye is handsome',
      description: 'very good looking fellow',
    });
  })
});
