import { config } from "dotenv";

config();

export const PORT = Number(process.env.PORT) || 3000;
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";
export const ON_DETA = process.env.DETA_RUNTIME !== undefined;
export const WHITE_LIST = new RegExp(process.env.WHITE_LIST || ".*", "i");

if (!GITHUB_TOKEN) {
    console.error("No GitHub token provided.");
    process.exit(1);
}
