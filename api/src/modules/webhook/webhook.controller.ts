import { Controller, Post, Req } from '@nestjs/common';
import { DeviceService } from '../device/device.service';

@Controller('webhook')
export class WebhookController {
  constructor(readonly deviceService: DeviceService) {}

  @Post('/alexa')
  async alexaWebhook(@Req() req: any) {
    const data = req.body;
    return this.deviceService.setStatusById(data.deviceId, data.status);
  }
}
