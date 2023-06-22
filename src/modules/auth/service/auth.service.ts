import { Injectable } from '@nestjs/common';
import { Admin } from '../../admin/model/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private adminRepository: Repository<Admin>;
  constructor(private jwtService: JwtService, private connection: Connection) {
    this.adminRepository = connection.getRepository(Admin);
  }

  async validateByAdmin(login: string, pass: string): Promise<Admin> | null {
    const admin = await this.adminRepository.findOne({ where: { login } });
    if (admin && (await bcrypt.compare(pass, admin.passwordHash))) {
      const { passwordHash, ...secureAdmin } = admin;
      return secureAdmin;
    }
    return null;
  }

  async login(admin: any) {
    console.log('login admin', admin);
    const payload = { id: admin.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
