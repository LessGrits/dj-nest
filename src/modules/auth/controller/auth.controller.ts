import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../service/auth.service';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Admin } from "../../admin/model/admin.entity";

@Controller('auth')
export class AuthController {
  private adminRepository: Repository<Admin>;
  constructor(
    private authService: AuthService,
    private connection: Connection,
  ) {
    this.adminRepository = connection.getRepository(Admin);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards()
  @Get('create-admin')
  async createAdmin(@Request() req) {
    const admin: Admin = this.adminRepository.create({
      login: 'admin',
      passwordHash: await bcrypt.hash('0000', 10),
      nickName: 'Lessyk',
    });

    await this.adminRepository.insert(admin);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  async refresh(@Request() req) {
    const admin = await this.adminRepository.findOne(req.user.id);
    return this.authService.login(admin);
  }
}
