import { Router, Request, Response, NextFunction } from "express";
import { NewsletterModel } from "../models";

export const NewsletterController = Router();


NewsletterController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await NewsletterModel.deleteOne(query).then((val) => {
      if (val.deletedCount == 1) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Newsletter deleted successfully"
        });
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! something wrong, please try again"
        });
      }
    })

  } catch (error) {
    next(error)
  }
});

NewsletterController.get('/list', async (request: Request, response: Response, next: NextFunction) => {
  try {
    await NewsletterModel.find().then((val) => {
      if (val) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Newsletter details successfully",
          "payload": val
        });
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! newsletter not found."
        });
      }
    })
  } catch (error) {
    next(error)
  }
});
