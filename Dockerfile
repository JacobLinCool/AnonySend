FROM node:alpine as builder

RUN npm i -g pnpm
WORKDIR /app
COPY . .
RUN pnpm i && pnpm build && pnpm prune --prod

FROM node:alpine as anonysend

WORKDIR /app
COPY --from=builder /app .
CMD ["npm", "start"]
