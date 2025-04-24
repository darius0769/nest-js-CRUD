import { forwardRef, Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PrismaModule,
    JwtModule.register({
      secret: 'fhbgiug65767svsjcvj',
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [JwtModule],
})
export class AuthenticationModule {}
