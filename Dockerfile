FROM node:22-alpine AS base

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1


# Install all dependencies once for both development and the production build.
FROM base AS dependencies

COPY package.json package-lock.json ./

RUN npm ci --libc=musl --no-audit --no-fund \
    # npm may keep glibc native binaries alongside Alpine's musl variants.
    && find node_modules -mindepth 1 -maxdepth 2 -type d \
      \( -name '*-linux-*-gnu' -o -name 'sharp-linux-*' -o -name 'sharp-libvips-linux-*' \) \
      ! -name '*musl*' -exec rm -rf '{}' + \
    && npm cache clean --force


# Optional hot-reload image:
# docker build --target development -t aura-ui:dev .
FROM base AS development

ENV NODE_ENV=development

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0"]


# Compile the application in a throwaway stage.
FROM base AS builder

ENV NODE_ENV=production

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

RUN npm run build


# Keep only the files traced by Next.js in the final image.
FROM base AS runner

ENV NODE_ENV=production \
    HOSTNAME=0.0.0.0 \
    PORT=3000

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 --ingroup nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
