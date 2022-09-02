import { defineConfig } from "tsup";

export default defineConfig(() => ({
    entry: ["src/index.ts", "src/server.ts"],
    outDir: "dist",
    target: "node14",
    format: ["cjs"],
    shims: true,
    clean: true,
    splitting: false,
    dts: true,
}));
