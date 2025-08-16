import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signup(email: string, password: string, name?: string) {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashPassword,
        name,
      },
    });

    return { message: 'User Created successfully', user };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('User not found!');

    const passwordMatch = user.password
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!passwordMatch) throw new Error('Invalid credentials!');

    // jwt token
    const token = this.jwt.sign({ sub: user.id, email: user.email });

    return { access_token: token };
  }
}
