import { Router } from "express";
import { Authguard } from "../guards";
import { UserController } from "./user";
import { ProfileController } from "./profile";
import { TopicController } from "./topic";
import { TagsController } from "./tag";
import { QuestionsController } from "./questions";
import { RelationController } from "./relation";
import { BlogController } from "./blog";
import { NewsletterController } from "./newsletter";
import { QuizAnalyticsController } from "./quizAnalytics";


import { FrontendController } from "./forntend/page";
import { XlsxController } from "./forntend/xlsx";


export const RootController = Router()
console.log("<=============controller=============>")
RootController.use("/user", UserController);
RootController.use("/profile", Authguard, ProfileController);
RootController.use("/topic", Authguard, TopicController);
RootController.use("/tags", Authguard, TagsController);
RootController.use("/questions", Authguard, QuestionsController);
RootController.use("/relation", Authguard, RelationController);
RootController.use("/blog", Authguard, BlogController);
RootController.use("/newsletter", Authguard, NewsletterController);

RootController.use("/quiz-analytics", Authguard, QuizAnalyticsController);

RootController.use("/page", FrontendController);
RootController.use("/xlsx", XlsxController);