import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';

@Controller('login')
export class AuthenticationController {
  constructor(private authenticationService: AuthenticationService) {}

  @Post()
  login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    return this.authenticationService.login(body, res);
  }
}
