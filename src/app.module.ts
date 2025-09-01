import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { MailController } from './mail/mail.controller';
import { MailService } from './mail/mail.service';

@Module({
  imports: [HelloModule, UserModule, PrismaModule, PostModule, AuthModule],
  controllers: [AppController, MailController],
  providers: [AppService, PrismaService, MailService],
})
export class AppModule {}
