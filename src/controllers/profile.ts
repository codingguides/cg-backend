import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models";

export const ProfileController = Router();


/*
** API NAME: Profile
** Methode: POST
*/

ProfileController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await UserModel.updateOne(
      query,
      body,
      { upsert: true, useFindAndModify: false },
      function (err, result) {
        if (result) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "User Succefully Updated"
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! user not found.",
            err
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});
