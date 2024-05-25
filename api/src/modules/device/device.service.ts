import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Device } from '../../models/device.model';
import { DeviceStatus } from '../../enums/device-status.enum';
import { MqttService } from '../../infra/mqtt/mqtt.service';
import { DeviceGateway } from './device.gateway';

@Injectable()
export class DeviceService {
  constructor(
    private readonly deviceGateway: DeviceGateway,
    private readonly mqttService: MqttService,
    private readonly prismaService: PrismaService,
  ) {
    this.mqttService.subscribe('stat/+/RESULT', async (topic, message) => {
      const deviceId = topic.split('/')[1];
      const status =
        JSON.parse(message.toString()).POWER === 'ON'
          ? DeviceStatus.active
          : DeviceStatus.inactive;

      await this.prismaService.device.update({
        where: { id: deviceId },
        data: { status },
      });

      await this.deviceGateway.sendStatus(deviceId, status);
    });
  }

  async findAll(): Promise<Device[]> {
    const devices = await this.prismaService.device.findMany();

    return devices.map((device) => ({
      ...device,
      status: device.status as DeviceStatus,
    }));
  }

  async toggleById(deviceId: string) {
    this.mqttService.publish(`cmnd/${deviceId}/POWER`, 'TOGGLE');
  }

  async setStatusById(deviceId: string, status: DeviceStatus) {
    const message = status === DeviceStatus.active ? 'ON' : 'OFF';

    this.mqttService.publish(`cmnd/${deviceId}/POWER`, message);
  }
}
