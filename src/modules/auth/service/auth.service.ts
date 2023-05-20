import { Injectable } from '@nestjs/common';
import { Admin } from '../../admin/model/admin';
import { AdminRepository } from '../../admin/service/admin.repository';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminRepository,
    private jwtService: JwtService,
  ) {}

  async validateByAdmin(login: string, pass: string): Promise<Admin> | null {
    const admin = await this.adminService.findByLogin(login);
    if (admin && admin.password === pass) {
      const { password, ...secureAdmin } = admin;
      return secureAdmin;
    }
    return null;
  }

  async login(admin: Admin) {
    const payload = { id: admin.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
