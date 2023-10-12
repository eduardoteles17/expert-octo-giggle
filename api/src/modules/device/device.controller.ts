import { Controller, Get, Param, Post } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  findAll() {
    return this.deviceService.findAll();
  }

  @Post(':deviceId/toggle')
  toggleById(@Param('deviceId') deviceId: string) {
    return this.deviceService.toggleById(deviceId);
  }
}
