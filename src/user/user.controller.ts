import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/authorization/authorization.guard';
import { AllowedRoles } from 'src/authorization/authorization.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
    }),
  )
  create(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      image: string;
      role: string;
    },
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    return this.userService.create(body, file, res);
  }

  @UseGuards(AuthorizationGuard)
  @AllowedRoles('admin')
  @Get('get-all')
  getAll(@Res() res: Response) {
    return this.userService.getAll(res);
  }

  @UseGuards(AuthorizationGuard)
  @Get('get-by-id/:id')
  getById(@Param('id') id: string, @Res() res: Response) {
    return this.userService.getById(Number(id), res);
  }

  @UseGuards(AuthorizationGuard)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() body: { name?: string; email?: string; password?: string },
    @Res() res: Response,
  ) {
    this.userService.update(Number(id), body, res);
  }

  @UseGuards(AuthorizationGuard)
  @Delete('delete/:id')
  delete(@Param('id') id: string, @Res() res: Response) {
    this.userService.delete(Number(id), res);
  }
}
