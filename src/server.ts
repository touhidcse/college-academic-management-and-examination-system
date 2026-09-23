import "dotenv/config";

import app from "./app";
import config from "./config";

import {db} from "../prisma/db";

const server = app.listen(
    config.port,
    () => {
        console.log(
            `Server running on port ${config.port}`,
        );
    },
);

const shutdown = async () => {
    console.log(
        "Shutting down server...",
    );

    server.close(async () => {
        await db.close();

        process.exit(0);
    });
};

process.on(
    "SIGINT",
    shutdown,
);

process.on(
    "SIGTERM",
    shutdown,
);