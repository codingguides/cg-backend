import { Router, Request, Response, NextFunction } from "express";
import { RelationModel } from "../models";
import { check, body, validationResult } from 'express-validator';

export const RelationController = Router();

RelationController.post('/add',
  // check('topic_id').not().isEmpty().withMessage('Topic id is required'),
  // check('question_id').not().isEmpty().withMessage('Question id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      var ObjectId = require('mongodb').ObjectId;
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } else {
        const { body } = request;
        let query = {};
        let qbody = {};
        await RelationModel.syncIndexes();

        if (body.question_id) {
          query = { "question_id": body.question_id, "topic_id": body.topic_id };
          qbody = {
            topic_id: body.topic_id,
            question_id: body.question_id,
            type: "topic"
          };
        } else {
          query = { "topic_id": body.topic_id, "blog_id": body.blog_id };
          qbody = {
            topic_id: body.topic_id,
            blog_id: body.blog_id,
            type: "blog"
          };
        }

        const data = await RelationModel.find(query);

        if (data.length > 0) {
          response.status(200).send({
            "success": false,
            "message": "Relation already exists."
          });
        } else {
          let relationData = new RelationModel(qbody);
          relationData.save(
            function (err, data) {
              if (data) {
                response.status(200).send({
                  "status": "SUCCESS",
                  "msg": "Relation Added successfully",
                  "payload": data
                });
              } else {
                response.status(200).send({
                  "status": "ERROR",
                  "msg": "Oops! something wrong",
                  err
                });
              }
            }
          );
        }

      }

    } catch (error) {
      next(error)
    }
  });

RelationController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await RelationModel.deleteOne(query).then((val) => {
      if (val.deletedCount == 1) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Relation deleted successfully"
        });
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! something wrong, please try again"
        });
      }
    })

  } catch (error) {
    next(error)
  }
});

RelationController.get('/get/:topic_id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { topic_id } = request.params;
    var ObjectId = require('mongodb').ObjectId;

    await RelationModel.aggregate([
      {
        $match: { topic_id: ObjectId(topic_id) }
      },
      {
        $lookup: {
          from: "topics",
          localField: "topic_id",
          foreignField: "_id",
          as: "topics"
        }
      },
      {
        $lookup: {
          from: "questions",
          localField: "question_id",
          foreignField: "_id",
          as: "questions"
        }
      }
    ])
      .then((values) => {
        if (values) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Relation details successfully",
            "payload": values
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! relation not found."
          });
        }
      })

  } catch (error) {
    next(error)
  }
});

RelationController.get('/blog/:blog_id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { blog_id } = request.params;
    var ObjectId = require('mongodb').ObjectId;

    await RelationModel.aggregate([
      {
        $match: { blog_id: ObjectId(blog_id) }
      },
      {
        $lookup: {
          from: "blog",
          localField: "blog_id",
          foreignField: "_id",
          as: "blog"
        }
      },
      {
        $lookup: {
          from: "questions",
          localField: "question_id",
          foreignField: "_id",
          as: "questions"
        }
      }
    ])
      .then((values) => {
        if (values) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Relation details successfully",
            "payload": values
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! relation not found."
          });
        }
      })

  } catch (error) {
    next(error)
  }
});

RelationController.get('/get/:type/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id, type } = request.params;
    let query = [];
    var ObjectId = require('mongodb').ObjectId;

    console.log(id, ">>>>>>>>>>", type)

    if (type == 'topic') {
      query = [
        {
          $match: { topic_id: ObjectId(id), type: "topic" }
        },
        {
          $lookup: {
            from: "topics",
            localField: "topic_id",
            foreignField: "_id",
            as: "topics"
          }
        },
        {
          $lookup: {
            from: "questions",
            localField: "question_id",
            foreignField: "_id",
            as: "questions"
          }
        }
      ]
    } else if (type == 'blog') {
      query = [
        {
          $match: { topic_id: ObjectId(id), type: "blog" }
        },
        {
          $lookup: {
            from: "blogs",
            localField: "blog_id",
            foreignField: "_id",
            as: "blogs"
          }
        },
        {
          $lookup: {
            from: "topics",
            localField: "topic_id",
            foreignField: "_id",
            as: "topics"
          }
        }
      ]
    }
    console.log("query>>>>>>>>>>>>>", query)
    await RelationModel.aggregate(query)
      .then((values) => {
        if (values) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Relation details successfully",
            "payload": values
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! relation not found."
          });
        }
      })

  } catch (error) {
    next(error)
  }
});