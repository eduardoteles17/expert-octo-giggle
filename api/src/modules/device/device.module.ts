import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { PrismaModule } from '../../infra/prisma/prisma.module';
import { MqttModule } from '../../infra/mqtt/mqtt.module';
import { DeviceGateway } from './device.gateway';

@Module({
  imports: [PrismaModule, MqttModule],
  exports: [DeviceService],
  controllers: [DeviceController],
  providers: [DeviceService, DeviceGateway],
})
export class DeviceModule {}
