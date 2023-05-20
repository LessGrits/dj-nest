import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Admin } from '../../admin/model/admin';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
    });
  }

  async validate(login: string, password: string): Promise<Admin> | null {
    const admin = await this.authService.validateByAdmin(login, password);

    if (!admin) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}
