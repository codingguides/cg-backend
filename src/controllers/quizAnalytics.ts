import { Router, Request, Response, NextFunction } from "express";
import { QuizAnalyticsModel } from "../models";
import { check, body, validationResult } from 'express-validator';

export const QuizAnalyticsController = Router();


QuizAnalyticsController.post('/add',

  check('topic_slug').not().isEmpty().withMessage('topic_slug is required'),
  check('user_id').not().isEmpty().withMessage('user_id is required'),
  check('rating').not().isEmpty().withMessage('rating is required'),
  check('status').not().isEmpty().withMessage('status is required'),
  async (request: Request, response: Response, next: NextFunction) => {
    try {


      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } else {
        const { body } = request;
        await QuizAnalyticsModel.syncIndexes();

        let QuizAnalyticsData = new QuizAnalyticsModel({
          topic_slug: body.topic_slug,
          user_id: body.user_id,
          rating: body.rating,
          status: body.status
        });

        QuizAnalyticsData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(QuizAnalyticsData)
            } else if (err) throw err;
          }
        );
      }

    } catch (error) {
      next(error)
    }
  });



QuizAnalyticsController.get('/list/:userid', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { userid } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var u_id = new ObjectId(userid);

    const query = { user_id: ObjectId(u_id) };

    await QuizAnalyticsModel.findOne(query).then((val) => {
      if (val) {
        response.status(200).send({
          "success": [
            {
              "msg": "Quiz analytics details successfully",
              "data": val
            }
          ]
        });
      } else {
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! Quiz analytics not found."
            }
          ]
        });
      }

    })

  } catch (error) {
    next(error)
  }
});


