import { Body, Controller, Post } from '@nestjs/common';
import { ChangeDeviceStatusDto } from './dto/ChangeDeviceStatus.dto';
import { DeviceService } from '../device/device.service';

@Controller('webhook')
export class WebhookController {
  constructor(readonly deviceService: DeviceService) {}

  @Post('/alexa')
  async alexaWebhook(@Body() data: ChangeDeviceStatusDto) {
    console.log(data);
    return this.deviceService.setStatusById(data.deviceId, data.status);
  }
}
