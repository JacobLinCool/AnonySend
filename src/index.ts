#!/usr/bin/env node
import { PORT } from "./config";
import { server } from "./server";

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
