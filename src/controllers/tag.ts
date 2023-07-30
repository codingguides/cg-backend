import { Router, Request, Response, NextFunction } from "express";
import { TagsModel } from "../models";
import {check, body, validationResult } from 'express-validator';
import { Authguard } from "../guards";

export const TagsController = Router();


TagsController.post('/add', 
  check('name').not().isEmpty().withMessage('Tag is required'),
  check('type').not().isEmpty().withMessage('Tag type is required'),
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
        name: body.name,
        type: body.type,
        topic_id: ObjectId(body.topic_id),
        question_id: ObjectId(body.question_id)
      });
      tagData.save(
        function (err, data) {
          if (data) {
            response.status(200).send({
              "status": "SUCCESS",
              "msg": "Tags Added successfully",
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

TagsController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await TagsModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Tags deleted successfully"
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

TagsController.post('/search',
  async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    Authguard(request, response, next);

    const authorization = request.headers['authorization'];
    console.log("authorization>>>>>>>>>>>>>>>>>>",authorization)
    

    await TagsModel.find({name: {'$regex': body.name}}).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Tags details successfully fetched",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! tag not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});
