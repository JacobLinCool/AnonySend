import express from "express";
import parser from "ua-parser-js";
import { RateLimiter } from "./rate-limiter";
import { LIMITER_LIMIT, LIMITER_INTERVAL, LIMITER_CONCURRENT } from "./config";
import { send } from "./send";
import { log } from "./logs";

export const server: express.Express = express().use(express.json());
const limiter = new RateLimiter({
    limit: LIMITER_LIMIT,
    interval: LIMITER_INTERVAL,
    concurrent: LIMITER_CONCURRENT,
});

server.get("/", (req, res) => {
    res.json({ success: true, data: { message: "Alive." } });
});

server.post("/send", async (req, res) => {
    const { from, to, content } = req.body;

    if (!from || !to || !content) {
        return res.status(400).json({
            success: false,
            data: { message: "Missing required query parameters." },
        });
    }

    if (typeof from !== "string" || typeof to !== "string" || typeof content !== "string") {
        return res.status(400).json({
            success: false,
            data: { message: "Invalid query parameters." },
        });
    }

    await limiter.lock();
    try {
        const ua = parser(req.headers["user-agent"]);
        const info = [
            `Sent from **${ua.browser.name || "Unknown Browser"}** on **${
                ua.os.name || "Unknown OS"
            }**`,
        ];
        const result = await send(from, to, content, info);
        log.write("Sent message", { from, to, content, result });
        res.json({ success: result.success, data: { link: result.link } });
    } catch (error) {
        res.status(500).json({ success: false, data: { message: (error as Error).message } });
    }
    limiter.unlock();
});

server.get("/logs", async (req, res) => {
    res.json({ success: true, data: { logs: await log.read() } });
});

server.use((req, res) => {
    res.status(404).json({
        success: false,
        data: { message: "Not found.", see: "https://github.com/JacobLinCool/AnonySend" },
    });
});

export default server;
