import { Module } from '@nestjs/common';
import { DeviceModule } from './modules/device/device.module';
import { ConfigModule } from '@nestjs/config';
import { appConfigurations } from './config/configurations';
import { WebhookModule } from './modules/webhook/webhook.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: appConfigurations,
    }),
    DeviceModule,
    WebhookModule,
  ],
})
export class AppModule {}
