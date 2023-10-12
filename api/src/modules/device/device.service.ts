import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { Device } from '../../models/device.model';
import { DeviceStatus } from '../../enums/device-status.enum';

@Injectable()
export class DeviceService {
  constructor(private readonly prismaService: PrismaService) {}

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

    const toggledDevice = await this.prismaService.device.update({
      where: { id: deviceId },
      data: {
        status:
          device.status === DeviceStatus.active
            ? DeviceStatus.inactive
            : DeviceStatus.active,
      },
    });

    return {
      ...toggledDevice,
      status: toggledDevice.status as DeviceStatus,
    };
  }
}
