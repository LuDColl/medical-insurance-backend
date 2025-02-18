import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { CompanyModule } from './modules/company/company.module';
import { SpecialtyModule } from './modules/specialty/specialty.module';
import { ExamModule } from './modules/exam/exam.module';
import { ClsModule } from 'nestjs-cls';
import { LocalModule } from './modules/local/local.module';
import { ProcedureModule } from './modules/procedure/procedure.module';
import { RegionalCouncilModule } from './modules/regional-counsil/regional-council.module';
import { clsModuleOptions, jwtModuleOptions } from './app.options';
import { AppGuardProvider } from './app.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmModuleAsyncOptions } from './modules/type-orm/type-orm.options';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync(typeOrmModuleAsyncOptions),
    JwtModule.register(jwtModuleOptions),
    ClsModule.forRoot(clsModuleOptions),
    AuthModule,
    UserModule,
    SpecialtyModule,
    ExamModule,
    ProcedureModule,
    CompanyModule,
    LocalModule,
    RegionalCouncilModule,
  ],
  controllers: [AppController],
  providers: [AppGuardProvider, AppService],
})
export class AppModule {}
