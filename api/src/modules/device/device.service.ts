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
}
