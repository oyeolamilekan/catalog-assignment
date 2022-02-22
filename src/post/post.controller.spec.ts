import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';

describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    update: jest.fn().mockImplementation((id, dto) => ({ id, ...dto })),
    delete: jest.fn().mockImplementation((id) => ({
      id,
      title: 'oye is handsome',
      description: 'very good lookin',
    })),
    remove: jest.fn().mockImplementation((id) => ({
      id,
      title: 'oye is handsome',
      description: 'very good lookin',
    })),
    findOne: jest.fn().mockImplementation((id) => ({
      id,
      title: 'oye is handsome',
      description: 'very good lookin',
    })),
    findAll: jest.fn(() => {
      return [
        {
          title: 'oye',
          description: 'lekan',
        },
      ];
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [PostService],
    })
      .overrideProvider(PostService)
      .useValue(mockPostService)
      .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('it should create a post', () => {
    expect(
      controller.create({
        description: 'lekan is good looking',
        title: 'loves your',
      }),
    ).toEqual({
      title: 'loves your',
      description: 'lekan is good looking',
    });

    expect(mockPostService.create).toHaveBeenCalled();
  });

  it('should update a post', () => {
    const dto = { description: 'lekan is good looking', title: 'loves your' };

    expect(controller.update('1', dto)).toEqual({
      id: 1,
      ...dto,
    });

    expect(mockPostService.update).toHaveBeenCalled();
  });

  it('it should fetch all posts', () => {
    expect(controller.findAll()).toEqual([
      {
        title: 'oye',
        description: 'lekan',
      },
    ]);

    expect(mockPostService.findAll).toHaveBeenCalled();
  });

  it('it should fetch on post', () => {
    expect(controller.findOne('1')).toEqual({
      id: 1,
      title: 'oye is handsome',
      description: 'very good lookin',
    });

    expect(mockPostService.findOne).toHaveBeenCalled();
  });

  it('remove post', () => {
    expect(controller.remove('1')).toEqual({
      id: 1,
      title: 'oye is handsome',
      description: 'very good lookin',
    });

    expect(mockPostService.delete).toHaveBeenCalled();
  });
});
