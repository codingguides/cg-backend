import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, TagsModel, TopicModel } from "../../models";

export const FrontendTopicController = Router();

console.log("<=========================topic -===============>");


FrontendTopicController.get('/get-menu', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find({ "showNav": true }).then((val) => {
      if (val) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Topics details successfully",
          "payload": val
        });
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

FrontendTopicController.get('/get-quiz-list/:slug', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { slug } = request.params;
    var ObjectId = require('mongodb').ObjectId;

    await TopicModel.findOne({ "slug": slug }).then(async (val) => {
      console.log(val)
      console.log(val._id)
      if (val && val._id) {
        console.log("if")
        await TopicModel.find({ "parent_id": ObjectId(val._id) }).then((sublist) => {
          if (sublist) {
            console.log("sublist if", sublist)
            response.status(200).send({
              "status": "SUCCESS",
              "msg": "Sub Topics details successfully",
              "payload": sublist
            });
          } else {
            console.log("sub else")

            response.status(404).send({
              "status": "ERROR",
              "msg": "Oops! sub topic not found."
            });
          }
        })
      } else {
        console.log("else")

        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! slug not found."
        });
      }
    })

  } catch (error) {
    next(error)
  }
});


FrontendTopicController.get('/quiz/:slug', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { slug } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    await TopicModel.findOne({ "slug": slug }).then(async (val) => {
      console.log("val>>>>>>>>>>>>>", val)
      if (val && val._id) {
        await RelationModel.find({ 'topic_id': ObjectId(val._id) }, { question_id: 1 }).then(async (relationdata) => {
          const relationIds = relationdata.map((rel) => ObjectId(rel.question_id))
          console.log(relationIds, "<<<<<<<<<<<<relationdata>>>>>>>>>>>>>", relationdata)
          if (relationdata) {
            await QuestionModel.find({ _id: { $in: relationIds } }).then(async (questions) => {
              console.log("questions>>>>>>>>>>>>>", questions)
              if (questions) {
                response.status(200).send({
                  "status": "SUCCESS",
                  "msg": "Questions details successfully",
                  "payload": questions
                });
              } else {
                response.status(404).send({
                  "status": "ERROR",
                  "msg": "Oops! questions not found."
                });
              }
            })
          } else {
            response.status(404).send({
              "status": "ERROR",
              "msg": "Oops! relation not found."
            });
          }
        })
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }
    })

  } catch (error) {
    next(error)
  }
});
