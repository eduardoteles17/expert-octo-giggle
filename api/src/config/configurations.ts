import { prismaConfiguration } from './prisma.config';
import { mqttConfiguration } from './mqtt.config';

export const appConfigurations = [prismaConfiguration, mqttConfiguration];
