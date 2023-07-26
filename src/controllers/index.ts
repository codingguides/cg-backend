import { Router } from "express";
import { Authguard } from "../guards";
import { UserController } from "./user";
import { TopicController } from "./topic";
import { TagsController } from "./tag";
import { RelationController } from "./relation";
import { SubTopicController } from "./subtopic";
import { SubTopicDescriptionController } from "./subtopicdescription";
import { QuizController } from "./quiz";

console.log(">>>>>>>>>>>Authguard<<<<<<<<<<<",Authguard)

export const RootController = Router()
console.log("<=============controller=============>")
RootController.use("/user",  UserController);
RootController.use("/topic",   Authguard, TopicController);
RootController.use("/tags", Authguard,  TagsController);
RootController.use("/relation", Authguard,  RelationController);
RootController.use("/subtopic", Authguard,  SubTopicController);
RootController.use("/subtopicdescription", Authguard,  SubTopicDescriptionController);

RootController.use("/quiz", Authguard,  QuizController);
