import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const QuestionController = Router();


QuestionController.post('/add', 

  check('question').not().isEmpty().withMessage('Question is required'),
  check('options').not().isEmpty().withMessage('options is required'),
  check('rightoption').not().isEmpty().withMessage('rightoption is required'),
  check('type').not().isEmpty().withMessage('type is required'),
  check('questiontype').not().isEmpty().withMessage('questiontype is required'),
  check('topic_id').not().isEmpty().withMessage('topic_id is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await QuestionModel.syncIndexes();
      const data = await QuestionModel.find({ "question": body.question });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "Question already exists."
        });
      } else {

        let QuestionData = new QuestionModel({
          question: body.question,
          options: body.options,
          rightoption: body.rightoption,
          point: body.point,
          type: body.type,
          questiontype: body.questiontype,
          topic_id: body.topic_id
        });
        QuestionData.save(
          function (err, data) {
            if (data) {
              response.status(200).send({
                "status": "SUCCESS",
                "msg": "Question Added successfully",
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
    next(error)
  }
});


QuestionController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuestionModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Questions deleted successfully"
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


