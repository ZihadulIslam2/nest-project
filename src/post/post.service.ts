import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  // Create a post for a user
  createPost(userId: number, data: { title: string; content?: string }) {
    return this.prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: userId,
      },
    });
  }

  // Get all posts
  getAllPosts() {
    return this.prisma.post.findMany({ include: { author: true } });
  }

  // Get single post
  getPostById(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  // Update post
  updatePost(id: number, data: { title?: string; content?: string }) {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  // Delete post
  deletePost(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }
}
