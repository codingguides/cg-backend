import { Router, Request, Response, NextFunction } from "express";
import { QuizModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const QuizController = Router();


QuizController.post('/add', 

  check('question').not().isEmpty().withMessage('Quiz is required'),
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
      await QuizModel.syncIndexes();
      const data = await QuizModel.find({ "question": body.question });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "Quiz already exists."
        });
      } else {

        let quizData = new QuizModel({
          question: body.question,
          options: body.options,
          rightoption: body.rightoption,
          point: body.point,
          type: body.type,
          questiontype: body.questiontype,
          topic_id: body.topic_id
        });
        quizData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(quizData)
            } else if (err) throw err;
          }
        );
      }
    }

  } catch (error) {
    next(error)
  }
});

QuizController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuizModel.updateOne(
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
            "message": result.nModified == 1 ? "Quiz Succefully Updated" : "Something Wrong Please Try Again"
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

QuizController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuizModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Quizs deleted successfully"
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

QuizController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    let query = { _id: ObjectId(_id) };

    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);
    query = { _id: ObjectId(_id) };
    

    await QuizModel.find(query).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Quizs details successfully",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! Quiz not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});




