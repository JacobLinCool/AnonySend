# AnonySend

This is a simple tool to let people create issues on GitHub anonymously.

Features:

- Restrict which repositories can be used as a destination
- Rate limit the number of issues that can be created in a given time period

## Usage

1. Setup `.env` file, see `.env.example` for an example
2. Build the project: `pnpm build`
3. Run it: `pnpm start`

Checkout [`src/config.ts`](src/config.ts) for more configuration options.

## Docker Usage

You can find a prebuilt image on [Docker Hub](https://hub.docker.com/r/jacoblincool/anonysend/tags).

> Supported Arch: `amd64`, `arm64`, `arm/v7`

### Docker Compose

1. Setup `.env` file, see `.env.example` for an example
2. Run `docker compose up`

### Docker Run

1. Setup `.env` file, see `.env.example` for an example
2. Run the following command:

```sh
docker run --env-file .env -p 3000:3000 jacoblincool/anonysend
```

> Tip: You may want to add `--rm` and `--detach` flags to the command above.
