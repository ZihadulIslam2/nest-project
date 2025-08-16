import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // makes it available everywhere without re-import
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // allow other modules to use it
})
export class PrismaModule {}
