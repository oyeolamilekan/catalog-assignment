import { Post } from './post/entities/post.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

const config: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: '../db',
  entities: [Post],
  synchronize: true,
};

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot(config),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
