import { Post } from './entities/post.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostService } from './post.service';

describe('PostService', () => {
  let service: PostService;

  const mockPostRepository = {
    create: jest.fn().mockImplementation((dto) => dto),

    save: jest.fn().mockImplementation((post) => Promise.resolve({ ...post })),

    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),

    delete: jest.fn().mockImplementation((id: number) => ({})),

    remove: jest.fn().mockImplementation((id: number) => ({
      title: 'oye is handsome',
      description: 'very good lookin',
    })),

    findOne: jest.fn().mockImplementation((id: number) => ({
      id,
      title: 'oye is handsome',
      description: 'very good lookin',
    })),

    findAll: jest
      .fn()
      .mockImplementation(() => [
        { title: 'oye', description: 'oyelamilekan' },
      ]),

    find: jest
      .fn()
      .mockImplementation(() => [
        { title: 'oye', description: 'oyelamilekan' },
      ]),
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

  it('should update a post record and return that', async () => {
    const dto = { description: 'lekan is good looking', title: 'loves your' };

    expect(await service.update(1, dto)).toEqual({
      id: 1,
      description: 'lekan is good looking',
      title: 'loves your',
    });
  });

  it('should get all post', async () => {
    expect(await service.findAll()).toEqual([
      { title: 'oye', description: 'oyelamilekan' },
    ]);
  });

  it('should get one post', async () => {
    expect(await service.findOne(1)).toEqual({
      id: 1,
      title: 'oye is handsome',
      description: 'very good lookin',
    });
  });

  it('should delete a post record and return that', async () => {
    expect(await service.delete(1)).toEqual({
      title: 'oye is handsome',
      description: 'very good lookin',
    });
  });
});
