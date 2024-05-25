import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { DeviceModule } from '../device/device.module';

@Module({
  imports: [DeviceModule],
  controllers: [WebhookController],
})
export class WebhookModule {}
