import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const QuestionsController = Router();


QuestionsController.post('/add', 

  check('question').not().isEmpty().withMessage('Question is required'),
  check('options').not().isEmpty().withMessage('options is required'),
  check('rightoption').not().isEmpty().withMessage('rightoption is required'),
  check('level').not().isEmpty().withMessage('level is required'),
  check('questiontype').not().isEmpty().withMessage('questiontype is required'),
  check('user_id').not().isEmpty().withMessage('user_id is required'),
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
          level: body.level,
          questiontype: body.questiontype,
          user_id: body.user_id
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

QuestionsController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuestionModel.updateOne(
      query,
      body,
      { upsert: true, useFindAndModify: false },
      function (err, result) {
        if (result) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": result.nModified == 1 ? "Question Succefully Updated" : "Something Wrong Please Try Again"
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! Question not found.",
            err
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

QuestionsController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuestionModel.deleteOne(query).then((val) => {
      if (val.deletedCount == 1) {
        response.status(200).send({
              "status": "SUCCESS",
              "msg": "Question deleted successfully"
            
        });
      } else {
        response.status(404).send({
              "status":"ERROR",
              "msg": "Oops! something wrong, please try again"
           
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

QuestionsController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await QuestionModel.findOne(query).then((val) => {
      if (val) {
        response.status(200).send({
              "status": "SUCCESS",
              "msg": "Question details successfully",
              "payload": val
          
        });
      } else {
        response.status(404).send({
              "status":"ERROR",
              "msg": "Oops! question not found."
          
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

QuestionsController.get('/', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await QuestionModel.find()
      .then((val) => {
        if (val) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Question details successfully",
            "payload": val
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! question not found.",
            "payload": []
          });
        }

      })

  } catch (error) {
    next(error)
  }
});



