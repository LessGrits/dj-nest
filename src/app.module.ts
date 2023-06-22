import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/**/*.entity.js'],
      migrationsRun: false,
      logging: true,
      migrations: [
        'dist/src/**/db/migrations/*{.ts,.js}',
        'dist/modules/**/db/migrations/*{.ts,.js}',
      ],
      synchronize: true,
    }),
    AuthModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
