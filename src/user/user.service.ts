import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { basename, extname, join } from 'path';
import { writeFileSync } from 'fs';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async create(
    data: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      image: string;
      role: string;
    },
    image: Express.Multer.File,
    res: Response,
  ) {
    try {
      const email = await this.prismaService.user.findUnique({
        where: { email: data.email },
      });
      if (!email) {
        if (data.password === data.confirmPassword) {
          const hashedPassword = await bcrypt.hash(data.password, 10);
          if (image) {
            const name = basename(
              image.originalname,
              extname(image.originalname),
            );
            const ext = extname(image.originalname);
            let filename = `${name}-${uuid()}${ext}`;
            const path = join(__dirname, '..', '..', 'uploads', filename);

            writeFileSync(path, image.buffer);

            const user = await this.prismaService.user.create({
              data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                image: filename,
                role: data.role,
              },
            });
          } else {
            const user = await this.prismaService.user.create({
              data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role,
              },
            });
          }
          return res
            .status(200)
            .json({ message: 'User record created.', success: true });
        } else {
          return res
            .status(500)
            .json({ message: "Passwords don't match.", success: false });
        }
      } else {
        return res
          .status(500)
          .json({ message: 'Email already in use.', success: false });
      }
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }

  async getAll(res: Response) {
    try {
      const user = await this.prismaService.user.findMany();
      return res.status(200).json({ message: user, success: true });
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }

  async getById(id: number, res: Response) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: id },
      });
      return res.status(200).json({ message: user, success: true });
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }

  async update(
    id: number,
    data: { name?: string; email?: string; password?: string },
    res: Response,
  ) {
    try {
      const user = await this.prismaService.user.update({
        where: { id: id },
        data: data,
      });
      return res.status(200).json({
        message: 'User data updated succesfully.',
        user,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }

  async delete(id: number, res: Response) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id: id },
      });
      return res.status(200).json({
        message: 'User record deleted.',
        user,
        success: true,
      });
    } catch (error) {
      return res.status(500).json({ message: error, success: false });
    }
  }
}
