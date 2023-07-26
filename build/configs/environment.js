"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvConfig = void 0;
exports.EnvConfig = {
    server: {
        port: Number.parseInt(process.env.PORT, 10) || 8080,
        environment: process.env.ENV || "PROD",
    },
    database: {
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
};
//# sourceMappingURL=environment.js.map