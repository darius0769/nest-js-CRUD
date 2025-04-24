import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: { email: string; password: string }, res: Response) {
    try {
      console.log(data.email, data.password);

      const user = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });
      if (user) {
        const passwordCompare = await bcrypt.compare(
          data.password,
          user.password,
        );
        if (passwordCompare) {
          const token = await this.jwtService.signAsync({
            id: user.id,
            role: user.role,
          });
          res.cookie('token', token);
          // console.log(token);
          return res
            .status(200)
            .json({ message: 'User logged-in succesfuly.', success: true });
        } else {
          return res
            .status(500)
            .json({ message: 'Wrong password input.', success: false });
        }
      } else {
        return res
          .status(500)
          .json({ message: 'User does not exist.', success: false });
      }
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }
}
