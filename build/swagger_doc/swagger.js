"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const _1 = require(".");
function swagger(app) {
    const swaggerDefinition = {
        info: {
            title: "Codingguides Backend application",
            version: "3.0.0",
            description: "Endpoints to test codingguides backend application",
        },
        host: "localhost:3059",
        basePath: "/api/",
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "x-auth-token",
                scheme: "bearer",
                in: "header",
            },
        },
    };
    const options = {
        // import swaggerDefinitions
        swaggerDefinition,
        apis: ['./json/**/*.yaml'],
    };
    // initialize swagger-jsdoc
    const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
    //for multiple file in yaml fromat use above swaggerSpec option insted of user
    app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(_1.user));
}
exports.swagger = swagger;
//# sourceMappingURL=swagger.js.map