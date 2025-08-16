import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // Create post for a user
  @Post(':userId')
  create(
    @Param('userId') userId: string,
    @Body() body: { title: string; content?: string },
  ) {
    return this.postService.createPost(Number(userId), body);
  }

  @Get()
  findAll() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.getPostById(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title?: string; content?: string },
  ) {
    return this.postService.updatePost(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }
}
