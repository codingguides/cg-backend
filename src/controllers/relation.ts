import { Router, Request, Response, NextFunction } from "express";
import { RelationModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const RelationController = Router();


RelationController.post('/add', 
  check('topic_id').not().isEmpty().withMessage('topic_id is required'),
  check('tag_id').not().isEmpty().withMessage('tag_id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await RelationModel.syncIndexes();
      let tagData = new RelationModel({
        topic_id: body.topic_id,
        tag_id: body.tag_id
      });
      tagData.save(
        function (err, data) {
          if (data) {
            response.status(200).send(tagData)
          } else if (err) throw err;
        }
      );
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

    await RelationModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Relation deleted successfully"
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

RelationController.post('/get-related-tags', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;

    await RelationModel.find({
      $and: [
        {"topic_id": body.topic_id },
        {"tag_id": body.tag_id }
      ]
    }).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Tag Relation details successfully fetched",
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
