import { Router, Request, Response, NextFunction } from "express";
import { SubTopicModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const SubTopicController = Router();


SubTopicController.post('/add', 
  check('name').not().isEmpty().withMessage('SubTopic is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('slug').not().isEmpty().withMessage('slug is required'),
  check('user_id').not().isEmpty().withMessage('user_id is required'),
  check('topic_id').not().isEmpty().withMessage('topic_id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await SubTopicModel.syncIndexes();
      const data = await SubTopicModel.find({ "name": body.name });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "SubTopic already exists."
        });
      } else {

        let SubTopicData = new SubTopicModel({
          name: body.name,
          description: body.description,
          slug: body.slug,
          user_id: body.user_id,
          topic_id: body.topic_id
        });
        SubTopicData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(SubTopicData)
            } else if (err) throw err;
          }
        );
      }
    }

  } catch (error) {
    next(error)
  }
});

SubTopicController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopicModel.updateOne(
      query,
      body,
      { upsert: true, useFindAndModify: false },
      function (err, result) {
        if (err) {
          response.status(404).send({
            "error": err,
          });
        } else {
          response.status(200).send({
            "success": true,
            "message": result.nModified == 1 ? "SubTopic Succefully Updated" : "Something Wrong Please Try Again"
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

SubTopicController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopicModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "SubTopics deleted successfully"
            }
          ]
        });
      }else{
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

SubTopicController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopicModel.findOne(query).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "SubTopics details successfully",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! SubTopic not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});
