import { Controller, Post } from '@nestjs/common';
import { DeviceService } from '../device/device.service';
import { DeviceStatus } from '../../enums/device-status.enum';

@Controller('webhook')
export class WebhookController {
  constructor(readonly deviceService: DeviceService) {}

  @Post('/alexa/active')
  async alexaWebhook() {
    return this.deviceService.setStatusById('smart-lamp', DeviceStatus.active);
  }

  @Post('/alexa/inactive')
  async alexaInactiveWebhook() {
    return this.deviceService.setStatusById(
      'smart-lamp',
      DeviceStatus.inactive,
    );
  }
}
