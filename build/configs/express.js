"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const controllers_1 = require("../controllers");
const environment_1 = require("./environment");
class Application {
    static app = undefined;
    static middlewares() {
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.text({ type: ["text/xml", 'application/xml'] }));
        this.app.use(body_parser_1.default.urlencoded({ extended: true, limit: "500mb" }));
        this.app.use(body_parser_1.default.json({ limit: "500mb" }));
        this.app.use((0, cookie_parser_1.default)());
        this.app.use((0, morgan_1.default)("combined"));
        this.app.set("trust proxy", true);
        this.app.use("/api", controllers_1.RootController);
        this.app.get('/test', (req, res) => {
            console.log("=========test==========");
            res.send({ "status": "Running", "project": "codingguides", "port": environment_1.EnvConfig.server.port });
        });
        console.log("==============express=================", environment_1.EnvConfig.server.port);
        if (environment_1.EnvConfig.server.environment != "PROD") {
            this.app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(require("../../json/swagger.json")));
        }
        // this.app.use( EnvConfig.server.port);
    }
    static init() {
        this.middlewares();
        console.log("============Express============");
        return this.app;
    }
}
exports.Application = Application;
//# sourceMappingURL=express.js.map