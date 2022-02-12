import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private postsRepository: Repository<Post>,) {}

  create(createPostDto: CreatePostDto) {
    const newPost = this.postsRepository.create(createPostDto);
    return this.postsRepository.save(newPost);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: number) {
    return this.postsRepository.findOne(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.findOne(id);
    post.title = updatePostDto.title;
    post.description = updatePostDto.description;
    return this.postsRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id)
    return this.postsRepository.remove(post);
  }
}
