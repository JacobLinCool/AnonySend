import { config } from "dotenv";

config();

export const PORT = Number(process.env.PORT) || 3000;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
export const ON_DETA = process.env.DETA_RUNTIME !== undefined;
export const WHITE_LIST = new RegExp(process.env.WHITE_LIST || ".*", "i");
export const LIMITER_LIMIT = Number(process.env.LIMITER_LIMIT) || 20;
export const LIMITER_INTERVAL = Number(process.env.LIMITER_INTERVAL) || 120_000;
export const LIMITER_CONCURRENT = Number(process.env.LIMITER_CONCURRENT) || 2;

if (!GITHUB_TOKEN) {
    console.error("No GitHub token provided.");
    process.exit(1);
}
