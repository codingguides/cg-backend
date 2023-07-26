"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configs_1 = require("./configs");
const datasource_1 = require("./datasource");
const swagger_doc_1 = require("./swagger_doc");
function bootstrap() {
    datasource_1.MongoDataSource.connect();
    const app = configs_1.Application.init();
    const { port } = configs_1.EnvConfig.server;
    (0, swagger_doc_1.swagger)(app);
    app.listen(port || 8080, () => {
        console.info(`server started on --------------------------> ${port}`);
    });
    process.on('SIGINT', () => {
        datasource_1.MongoDataSource.disconnect();
    });
}
bootstrap();
//# sourceMappingURL=app.js.map