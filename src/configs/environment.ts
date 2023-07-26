export const EnvConfig = {
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
}