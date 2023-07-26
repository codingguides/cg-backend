import { Router, Request, Response, NextFunction } from "express";
import { SubTopiceDescriptionModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const SubTopicDescriptionController = Router();


SubTopicDescriptionController.post('/add', 
  check('name').not().isEmpty().withMessage('SubTopicDescription is required'),
  check('description').not().isEmpty().withMessage('Description is required'),
  check('subtopic_id').not().isEmpty().withMessage(' subtopic_id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await SubTopiceDescriptionModel.syncIndexes();
      const data = await SubTopiceDescriptionModel.find({ "name": body.name });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "Sub Topic Description already exists."
        });
      } else {

        let SubTopicDescriptionData = new SubTopiceDescriptionModel({
          name: body.name,
          description: body.description,
          subtopic_id: body.subtopic_id
        });
        SubTopicDescriptionData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(SubTopicDescriptionData)
            } else if (err) throw err;
          }
        );
      }
    }

  } catch (error) {
    next(error)
  }
});

SubTopicDescriptionController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopiceDescriptionModel.updateOne(
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
            "message": result.nModified == 1 ? "Sub Topic Description Succefully Updated" : "Something Wrong Please Try Again"
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

SubTopicDescriptionController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopiceDescriptionModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Sub Topic Descriptions deleted successfully"
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

SubTopicDescriptionController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await SubTopiceDescriptionModel.findOne(query).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Sub Topic Descriptions details successfully",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! Sub Topic Description not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});
