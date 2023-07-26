import { Router, Request, Response, NextFunction } from "express";
import { InterviewModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const InterviewController = Router();


InterviewController.post('/add',

  check('question').not().isEmpty().withMessage('question is required'),
  check('answer').not().isEmpty().withMessage('answer is required'),
  check('type').not().isEmpty().withMessage('type is required'),
  check('topic_id').not().isEmpty().withMessage('topic_id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

  
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await InterviewModel.syncIndexes();
      const data = await InterviewModel.find({ "question": body.question });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "Interview already exists."
        });
      } else {

        let InterviewData = new InterviewModel({
          question: body.question,
          answer: body.answer,
          type: body.type,
          topic_id: body.topic_id
        });

        InterviewData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(InterviewData)
            } else if (err) throw err;
          }
        );
      }
    }

  } catch (error) {
    next(error)
  }
});

InterviewController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await InterviewModel.updateOne(
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
            "message": result.nModified == 1 ? "Interview Succefully Updated" : "Something Wrong Please Try Again"
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

InterviewController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await InterviewModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Interview deleted successfully"
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

InterviewController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await InterviewModel.findOne(query).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Interview details successfully",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! Interview not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});


