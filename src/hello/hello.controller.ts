import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HelloService } from './hello.service';
import type { Request, Response } from 'express';
import { CreateUserDto } from './create-user.dto';

@Controller('hello')
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Get('custom')
  customHandler(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({
      method: req.method,
      url: req.url,
      message: 'Custom Response',
    });
  }

  @Get()
  getHello(): string {
    return this.helloService.sayHello();
  }

  @Get('greet')
  getGrate(): string {
    return this.helloService.sayGrate();
  }

  // Query Parameter
  @Get('search')
  search(@Query('keyword') keyword: string) {
    return `You searched for: ${keyword}`;
  }
  // Path Parameter
  @Get(':name')
  getByName(@Param('name') name: string) {
    return `hello ${name}`;
  }

  @Post()
  create<T>(@Body() body: T) {
    return {
      message: 'Data received',
      data: body,
    };
  }

  @Post('user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  createUser(@Body() createUserDto: CreateUserDto) {
    return {
      message: 'User created',
      data: createUserDto,
    };
  }
}
