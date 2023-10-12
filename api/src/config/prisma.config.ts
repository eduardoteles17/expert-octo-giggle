import { registerAs } from '@nestjs/config';

export const prismaConfiguration = registerAs('prisma', () => ({
  url: String(process.env.DATABASE_URL),
}));
