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

  async toggleById(deviceId: string): Promise<Device> {
    const device = await this.prismaService.device.findUnique({
      where: { id: deviceId },
    });

    const newStatus =
      device.status === DeviceStatus.active
        ? DeviceStatus.inactive
        : DeviceStatus.active;

    const message = newStatus === DeviceStatus.active ? 'ON' : 'OFF';

    this.mqttService.publish(`cmnd/${deviceId}/POWER`, message);

    const toggledDevice = await this.prismaService.device.update({
      where: { id: deviceId },
      data: {
        status: newStatus,
      },
    });

    await this.deviceGateway.sendStatus(deviceId, newStatus);

    return {
      ...toggledDevice,
      status: toggledDevice.status as DeviceStatus,
    };
  }

  async setStatusById(deviceId: string, status: DeviceStatus): Promise<Device> {
    const message = status === DeviceStatus.active ? 'ON' : 'OFF';

    this.mqttService.publish(`cmnd/${deviceId}/POWER`, message);

    const updatedDevice = await this.prismaService.device.update({
      where: { id: deviceId },
      data: { status },
    });

    await this.deviceGateway.sendStatus(deviceId, status);

    return {
      ...updatedDevice,
      status: updatedDevice.status as DeviceStatus,
    };
  }
}
