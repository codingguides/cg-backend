"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDataSource = void 0;
const mongoose_1 = require("mongoose");
const configs_1 = require("../configs");
class MongoDataSource {
    static mongoConnection = undefined;
    constructor() { }
    static async connect() {
        const { username, password, host, port, name } = configs_1.EnvConfig.database;
        console.log("EnvConfig.database==========>", configs_1.EnvConfig.database);
        const mongoUrl = 'mongodb+srv://codingguides:Angrybirds@2022@codingguides.xugtyib.mongodb.net/';
        //'mongodb://localhost:27017/codingguides?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
        if (!this.isConnected()) {
            (0, mongoose_1.connect)(mongoUrl, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                socketTimeoutMS: 60000,
                connectTimeoutMS: 60000,
            })
                .then((connection) => {
                console.log("================Successfully Connected===============");
                this.setConnection(connection);
            })
                .catch((err) => {
                console.warn(`mongo connection error`, err);
            });
        }
        else {
            console.info(`Database Already Connected`);
        }
    }
    static setConnection(connection) {
        this.mongoConnection = connection;
        this.mongoConnection.connection.on("disconnected", (error) => {
            console.error("database connection closed", error);
        });
    }
    static isConnected() {
        if (this.mongoConnection && this.mongoConnection.connection) {
            const { readyState } = this.mongoConnection.connection;
            console.info(`MongoDB ready state = ${readyState}`);
            return readyState === 1;
        }
        return false;
    }
    static getConnection() {
        return this.mongoConnection;
    }
    static disconnect() {
        this.mongoConnection.connection.close(() => {
            this.mongoConnection = undefined;
            process.exit(0);
        });
    }
}
exports.MongoDataSource = MongoDataSource;
//# sourceMappingURL=mongodb.js.map