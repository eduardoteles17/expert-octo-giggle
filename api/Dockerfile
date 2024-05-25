FROM node:lts-alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY . .

ENV DATABASE_URL "file:smart-lamp.db"

RUN pnpm install --frozen-lockfile

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
