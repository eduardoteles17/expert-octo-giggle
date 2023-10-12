import { Module } from '@nestjs/common';
import { DeviceModule } from './modules/device/device.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigurations } from './config/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: appConfigurations,
    }),
    DeviceModule,
  ],
})
export class AppModule {}
