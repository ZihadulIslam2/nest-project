import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloService {
  sayHello(): string {
    return 'Hello nest js world! adfd';
  }

  sayGrate(): string {
    return 'Grate nest js world!';
  }
}
