FROM node:20 AS base

RUN wget https://github.com/duckdb/duckdb/releases/download/v0.10.2/duckdb_cli-linux-amd64.zip \
    && unzip duckdb_cli-linux-amd64.zip -d /usr/local/bin \
    && rm duckdb_cli-linux-amd64.zip

# Download and extract the file
RUN mkdir -p /app/data/.duckdb/extensions/v0.10.2/linux_amd64 && \
    curl -sSL http://extensions.duckdb.org/v0.10.2/linux_amd64/spatial.duckdb_extension.gz | \
    gunzip -c > /app/data/.duckdb/extensions/v0.10.2/linux_amd64/spatial.duckdb_extension

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
# TODO: use pnpm properly see: https://pnpm.io/docker
COPY package.json pnpm-lock.yaml ./ 
RUN npm install -g pnpm && pnpm i --frozen-lockfile

FROM base AS dev

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Rebuild the source code only when needed
FROM base AS builder

# postgres env variables for build step
ARG pghost
ARG pguser
ARG pgdatabase
ARG pgpassword
ARG pgport
ENV PGHOST=$pghost
ENV PGUSER=$pguser
ENV PGDATABASE=$pgdatabase
ENV PGPASSWORD=$pguser
ENV PGPORT=$pgport
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable next.js telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Uncomment the following line in case you want to disable telemetry during runtime.
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENVIRONMENT "production"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/data/digikar.duckdb ./data/digikar.duckdb
COPY --from=builder --chown=nextjs:nodejs /app/data/.duckdb ./data/.duckdb

USER nextjs

CMD ["node", "server.js"]
