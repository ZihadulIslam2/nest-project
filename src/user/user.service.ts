import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  createUser(data: { name: string; email: string }) {
    return this.prisma.user.create({ data });
  }

  getAllUsers() {
    return this.prisma.user.findMany({ include: { posts: true } });
  }

  getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
  }

  updateUser(id: number, data: { name?: string; email?: string }) {
    return this.prisma.user.update({ where: { id }, data });
  }

  deleteUser(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
