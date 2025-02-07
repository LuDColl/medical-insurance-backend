import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { AppGuard } from './app.guard';
import { APP_GUARD } from '@nestjs/core';
import { CompanyModule } from './modules/company/company.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { ExamModule } from './modules/exam/exam.module';
import { ClsModule } from 'nestjs-cls';
import { LocalModule } from './modules/local/local.module';
import { ProcedureModule } from './modules/procedure/procedure.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? 5432),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    AuthModule,
    UserModule,
    SpecialtyModule,
    ExamModule,
    ProcedureModule,
    CompanyModule,
    LocalModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AppGuard,
    },
    AppService,
  ],
})
export class AppModule {}
