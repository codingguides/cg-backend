import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, TagsModel, TopicModel } from "../models";
import { check, body, validationResult } from 'express-validator';
import { getIdBySlug } from '../common';


export const TopicController = Router();

console.log("<=========================topic -===============>");
// Authguard,
TopicController.post('/add',

  check('name').not().isEmpty().withMessage('Topic is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('slug').not().isEmpty().withMessage('slug is required'),
  check('user_id').not().isEmpty().withMessage('user_id is required'),
  check('home_tagline').not().isEmpty().withMessage('home_tagline is required'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      console.log("<=========================try -===============>");
      var ObjectId = require('mongodb').ObjectId;
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } else {
        const { body } = request;
        await TopicModel.syncIndexes();
        const data = await TopicModel.find({ "name": body.name });

        if (data.length > 0) {
          response.status(200).send({
            "success": false,
            "message": "Topic already exists."
          });
        } else {

          let topicData = {}
          if (body.parent_id == 0) {
            topicData = {
              name: body.name,
              description: body.description,
              slug: body.slug,
              user_id: ObjectId(body.user_id),
              index_no: body.index_no,
              home_tagline: body.home_tagline,
              homeTaglineIcon: body.homeTaglineIcon,
              showFeatures: body.showFeatures,

            }
          } else {
            topicData = {
              name: body.name,
              description: body.description,
              slug: body.slug,
              user_id: ObjectId(body.user_id),
              parent_id: ObjectId(body.parent_id),
              index_no: body.index_no,
              home_tagline: body.home_tagline,
              homeTaglineIcon: body.homeTaglineIcon,
              showFeatures: body.showFeatures,
            }
          }

          new TopicModel(topicData).save(
            function (err, data) {
              if (data) {
                response.status(200).send({
                  "status": "SUCCESS",
                  "msg": "Topics Added successfully",
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
      }

    } catch (error) {
      console.log("<=========================catch -===============>");

      next(error)
    }
  });

TopicController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await TopicModel.updateOne(
      query,
      body,
      { upsert: true, useFindAndModify: false },
      function (err, result) {
        if (result) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Topic Succefully Updated"
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! topic not found.",
            err
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

TopicController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await TopicModel.deleteOne(query).then((val) => {
      if (val.deletedCount == 1) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Topics deleted successfully"
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

TopicController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    await TopicModel.aggregate([
      {
        $match: { _id: ObjectId(_id) }
      },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "topic_id",
          as: "tags"
        }
      }
    ])
      .then((val) => {
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

TopicController.put('/', async (request: Request, response: Response, next: NextFunction) => {
  try {

    const { limit = 2, page = 1, type, search } = request.body;
    const count = await TopicModel.count();


    let tags = [];
    let query = []
    if (type === "Tag") {
      console.log("under if")
      await TagsModel.find({ "type": "topic", "name": search.toUpperCase() }, { "topic_id": 1, "_id": 0 }).then(async (res) => {
        await res.map((tag) => {
          tags.push(tag.topic_id)
        })
      })
      if (tags.length > 0) {
        console.log("tags>>>>>>>>>>", tags)
        query = [
          { $match: { _id: { $in: tags } } },
          {
            $lookup: {
              from: "topics",
              localField: "parent_id",
              foreignField: "_id",
              as: "parentDetails"
            },
          },
          {
            $lookup: {
              from: "tags",
              localField: "_id",
              foreignField: "topic_id",
              as: "tags"
            }
          }
        ]
      } else {
        console.log("else tags")
        throw response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! topic not found.",
          "payload": []
        });

      }
      console.log("tags>>>>>", tags)
    } else if (type === "Topic") {
      query = [
        { $match: { name: { '$regex': search, '$options': 'i' } } },
        {
          $lookup: {
            from: "topics",
            localField: "parent_id",
            foreignField: "_id",
            as: "parentDetails"
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "_id",
            foreignField: "topic_id",
            as: "tags"
          }
        }
      ]
    } else if (type === "Slug") {
      query = [
        { $match: { slug: { '$regex': search, '$options': 'i' } } },
        {
          $lookup: {
            from: "topics",
            localField: "parent_id",
            foreignField: "_id",
            as: "parentDetails"
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "_id",
            foreignField: "topic_id",
            as: "tags"
          }
        }
      ]
    } else {
      query = [
        {
          $lookup: {
            from: "topics",
            localField: "parent_id",
            foreignField: "_id",
            as: "parentDetails"
          },
        },
        {
          $lookup: {
            from: "tags",
            localField: "_id",
            foreignField: "topic_id",
            as: "tags"
          }
        }
      ]
    }

    console.log("query>>>>>>>>", query)

    await TopicModel.aggregate(query)
      .sort({ index_no: -1 })
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .then((val) => {
        if (val) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Topics details successfully",
            "payload": val,
            "totalPages": Math.ceil(count / limit),
            "currentPage": page
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! topic not found.",
            "payload": []
          });
        }
      })
  } catch (error) {
    next(error)
  }
});

TopicController.get('/list', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find().then((val) => {
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
