import { Router, Request, Response, NextFunction } from "express";
import { TagsModel } from "../models";
import {check, body, validationResult } from 'express-validator';
import { Authguard } from "../guards";

export const RelationshipTopicQuestionController = Router();


RelationshipTopicQuestionController.post('/add', 
  check('topic_id').not().isEmpty().withMessage('Topic id is required'),
  check('question_id').not().isEmpty().withMessage('Question id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {
    var ObjectId = require('mongodb').ObjectId;
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await TagsModel.syncIndexes();
      let tagData = new TagsModel({
        topic_id: body.topic_id,
        question_id: ObjectId(body.question_id)
      });
      tagData.save(
        function (err, data) {
          if (data) {
            response.status(200).send({
              "status": "SUCCESS",
              "msg": "Relation Added successfully",
              "payload": data
            });
          } else {
            response.status(404).send({
              "status": "ERROR",
              "msg": "Oops! something wrong",
              err
            });
          }
        }
      );

    }

  } catch (error) {
    next(error)
  }
});