import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { AuthenticationModule } from 'src/authentication/authentication.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthenticationModule)],
  providers: [UserService, AuthorizationGuard],
  controllers: [UserController],
})
export class UserModule {}
