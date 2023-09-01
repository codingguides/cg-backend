import { Router } from "express";
import { Authguard } from "../guards";
import { UserController } from "./user";
import { TopicController } from "./topic";
import { TagsController } from "./tag";
import { QuestionsController } from "./questions";
import { RelationshipTopicQuestionController } from "./relationshipTopicQuestion";
import { BlogController } from "./blog";

export const RootController = Router()
console.log("<=============controller=============>")
RootController.use("/user",  UserController);
RootController.use("/topic",   Authguard, TopicController);
RootController.use("/tags", Authguard,  TagsController);
RootController.use("/questions", Authguard,  QuestionsController);
RootController.use("/relation", Authguard,  RelationshipTopicQuestionController);
RootController.use("/blog", Authguard,  BlogController);