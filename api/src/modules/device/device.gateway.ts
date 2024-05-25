import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DeviceStatus } from '../../enums/device-status.enum';

@WebSocketGateway({})
export class DeviceGateway {
  @WebSocketServer() io: Server;

  async sendStatus(id: string, status: DeviceStatus) {
    this.io.emit('device-status', { deviceId: id, status });
  }
}
