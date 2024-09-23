import { Module } from '@nestjs/common';
import { ConfigModule, type ConfigModuleOptions } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import config from './config';

import { AuthModule, UploadModule, UserModule } from './modules';
import { DatabaseModule } from './shared/database';
import { EmailModule } from './shared/email';
import { JwtModule } from './shared/jwt';
import { LocationModule } from './shared/location';
import { OtpModule } from './shared/otp';
import { RedisModule } from './shared/redis';
import { SupabaseModule } from './shared/supabase';

import { AuthGuard } from './modules/auth/common/guards';

import { AppController } from './app.controller';
import { Oauth2Module } from './modules/oauth2/oauth2.module';
import { GuestbookModule } from './modules/guestbook/guestbook.module';

const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  expandVariables: true,
  envFilePath: '.env',
  load: [...Object.values(config)],
};

@Module({
  imports: [
    ConfigModule.forRoot(ConfigOptions),
    DatabaseModule,
    EmailModule,
    JwtModule,
    LocationModule,
    OtpModule,
    RedisModule,
    SupabaseModule,
    AuthModule,
    UploadModule,
    UserModule,
    Oauth2Module,
    GuestbookModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
