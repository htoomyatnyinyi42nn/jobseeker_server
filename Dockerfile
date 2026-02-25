
FROM oven/bun:1-alpine
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

# Elysia needs to bind to 0.0.0.0 to be accessible outside the container
ENV HOST=0.0.0.0
EXPOSE 3000

CMD ["bun", "src/index.ts"]