"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootController = void 0;
const express_1 = require("express");
const guards_1 = require("../guards");
const user_1 = require("./user");
const topic_1 = require("./topic");
const tag_1 = require("./tag");
const questions_1 = require("./questions");
const relationshipTopicQuestion_1 = require("./relationshipTopicQuestion");
exports.RootController = (0, express_1.Router)();
console.log("<=============controller=============>");
exports.RootController.use("/user", user_1.UserController);
exports.RootController.use("/topic", guards_1.Authguard, topic_1.TopicController);
exports.RootController.use("/tags", guards_1.Authguard, tag_1.TagsController);
exports.RootController.use("/questions", guards_1.Authguard, questions_1.QuestionsController);
exports.RootController.use("/relation", guards_1.Authguard, relationshipTopicQuestion_1.RelationshipTopicQuestionController);
//# sourceMappingURL=index.js.map