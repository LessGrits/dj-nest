import { Injectable } from '@nestjs/common';
import { Admin } from '../model/admin';

@Injectable()
export class AdminRepository {
  private readonly admins: Admin[];

  constructor() {
    this.admins = [
      {
        id: 1,
        login: 'admin',
        password: '0000',
      },
    ];
  }

  async findById(id: number): Promise<Admin> {
    return this.admins.find((admin) => admin.id === id);
  }
  async findByLogin(login: string): Promise<Admin> {
    return this.admins.find((admin) => admin.login === login);
  }
}
