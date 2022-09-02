import cuid from "cuid";
import { Deta } from "deta";
import { ON_DETA } from "./config";
import { stringify } from "./utils";

const logs: Record<string, string[]> = {};
const deta = ON_DETA ? Deta() : undefined;

export const log = {
    async write(...args: unknown[]): Promise<void> {
        const key = cuid();

        const content = args.map((arg) => {
            if (typeof arg === "string") {
                return arg;
            } else {
                return stringify(arg);
            }
        });

        if (deta) {
            const db = deta.Base("logs");
            await db.put(content, key);
        } else {
            logs[key] = content;
        }
    },
    async read(): Promise<Record<string, string[]>> {
        if (deta) {
            const db = deta.Base("logs");
            const { items } = await db.fetch();

            const result: Record<string, string[]> = {};
            for (const item of items) {
                if (typeof item.key === "string") {
                    result[item.key] = item.value as string[];
                }
            }
            return result;
        } else {
            return logs;
        }
    },
};
