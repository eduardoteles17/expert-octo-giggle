import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import mqtt, { ISubscriptionMap, OnMessageCallback } from 'mqtt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MqttService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(MqttService.name);
  private mqttClient: mqtt.MqttClient;

  constructor(private configService: ConfigService) {
    this.mqttClient = mqtt.connect(configService.get('mqtt.url'));
  }

  publish(topic: string, message: string | Buffer) {
    this.mqttClient.publish(topic, message);
  }

  subscribe(
    topic: string | string[] | ISubscriptionMap,
    callback: OnMessageCallback,
  ) {
    this.mqttClient.subscribe(topic);
    this.mqttClient.on('message', callback);
  }

  onModuleInit() {
    this.mqttClient.on('connect', () => {
      this.logger.log('Connected to MQTT broker');
    });
  }

  onModuleDestroy() {
    this.logger.log('Disconnecting from MQTT broker');
    this.mqttClient.end();
  }
}
