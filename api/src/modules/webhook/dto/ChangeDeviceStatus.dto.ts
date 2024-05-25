import { DeviceStatus } from '../../../enums/device-status.enum';

export class ChangeDeviceStatusDto {
  deviceId: string;

  status: DeviceStatus;
}
