"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const express_1 = require("express");
const guards_1 = require("../guards");
const user_1 = require("./user");
const topic_1 = require("./topic");
const tag_1 = require("./tag");
const question_1 = require("./question");
exports.RootController = (0, express_1.Router)();
console.log("<=============controller=============>");
exports.RootController.use("/user", user_1.UserController);
exports.RootController.use("/topic", guards_1.Authguard, topic_1.TopicController);
exports.RootController.use("/tags", guards_1.Authguard, tag_1.TagsController);
exports.RootController.use("/quiz", guards_1.Authguard, question_1.QuestionController);
//# sourceMappingURL=index.js.map