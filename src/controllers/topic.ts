import { Router, Request, Response, NextFunction } from "express";
import { TopicModel } from "../models";
import { check, body, validationResult } from 'express-validator';



export const TopicController = Router();

console.log("<=========================topic -===============>");
// Authguard,
TopicController.post('/add',

  check('name').not().isEmpty().withMessage('Topic is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('slug').not().isEmpty().withMessage('slug is required'),
  check('user_id').not().isEmpty().withMessage('user_id is required'),
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

          let topicData = new TopicModel({
            name: body.name,
            description: body.description,
            slug: body.slug,
            user_id: ObjectId(body.user_id),
            parent_id: ObjectId(body.parent_id)
          });

          console.log({
            name: body.name,
            description: body.description,
            slug: body.slug,
            user_id: body.user_id,
            parent_id: ObjectId(body.parent_id)
          })
          topicData.save(
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
        if (err) {
          response.status(404).send({
            "success": false,
            "error": err,
          });
        } else {
          response.status(200).send({
            "success": true,
            "message": result.nModified == 1 ? "Topic Succefully Updated" : "Something Wrong Please Try Again"
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
          "success": [
            {
              "msg": "Topics deleted successfully"
            }
          ]
        });
      } else {
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! something wrong, please try again"
            }
          ]
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

    const query = { _id: ObjectId(_id) };

    await TopicModel.findOne(query).then((val) => {
      if (val) {
        response.status(200).send({
          "success": [
            {
              "msg": "Topics details successfully",
              "data": val
            }
          ]
        });
      } else {
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! topic not found."
            }
          ]
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

TopicController.put('/', async (request: Request, response: Response, next: NextFunction) => {
  try {

    const { limit, page } = request.body;
    const count = await TopicModel.count();
    console.log("limit>>>>>",limit * 1)
    console.log("skip>>>>",(page - 1) * limit)

    await TopicModel.aggregate([
      {
        $lookup: {
          from: "topics",
          localField: "parent_id",
          foreignField: "_id",
          as: "parentDetails"
        }
      }
    ])
     .limit(limit) //10 | 
     .skip((page - 1) * limit) //0
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