import { registerAs } from '@nestjs/config';

export const mqttConfiguration = registerAs('mqtt', () => ({
  url: String(process.env.MQTT_URL),
}));
