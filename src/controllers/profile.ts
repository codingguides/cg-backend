import { Router, Request, Response, NextFunction } from "express";
import { UserModel } from "../models";
const { hashPassword } = require("../services/hash");
var jwt = require("jsonwebtoken");
let key = "KSpYChPbbKRrEIOj685rmY5d7eICGS5t";
const bcrypt = require("bcrypt");

export const ProfileController = Router();

/*
 ** API NAME: Update Profile
 ** Methode: PUT
 */

ProfileController.put(
  "/update/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      console.log("query>>>>>",query)

      await UserModel.updateOne(
        query,
        body,
        { upsert: true, useFindAndModify: false },
        async function (err, result) {
          console.log("result>>>>>0",result)

          if (result) {
            await UserModel.findOne(query).then((data) => {
              if (data) {
                const payload = {
                  id: data._id,
                  name: body.name,
                  email: body.email,
                  type: body.type,
                  isdelete: 0,
                  lastlogindate: new Date(),
                  loginType: body.loginType,
                  profile_pic: body.profile_pic
                };
                const accessToken = jwt.sign(payload, key, {
                  expiresIn: "30d",
                });

                response.status(200).send({
                  status: "SUCCESS",
                  msg: "Profile Successfully Updated.",
                  payload: data,
                  token: accessToken,
                });
              }
            });
          } else {
            response.status(404).send({
              status: "ERROR",
              msg: "Oops! Profile not found.",
              err,
            });
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
);

/*
 ** API NAME: Get Profile
 ** Methode: GET
 */

ProfileController.get(
  "/get/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      await UserModel.findOne(query).then((data) => {
        if (data) {
          response.status(200).send({
            status: "SUCCESS",
            msg: "Profile details successfully",
            payload: data,
          });
        } else {
          response.status(404).send({
            status: "ERROR",
            msg: "Oops! Profile not found.",
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

ProfileController.put(
  "/update-password/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      const data = await UserModel.findOne(query);
      if (data) {
        if(data["password"] == ""){
          const update = await UserModel.updateOne(
            query,
            { password: await hashPassword(body.newpassword) },
            { upsert: true, useFindAndModify: false },
            async function (err, result) {
              if (result) {
                response.status(200).send({
                  status: "SUCCESS",
                  msg: "Profile Password Updated Successfully",
                });
              } else {
                response.status(200).send({
                  status: "ERROR",
                  msg: "Oops! Something wrong.",
                  err,
                });
              }
            }
          );
          console.log("update>>>>>>",update)
        }else{
          bcrypt.compare(
            body.oldpassword,
            data["password"],
            async function (error, result) {
              if (result) {
                await UserModel.updateOne(
                  query,
                  { password: await hashPassword(body.newpassword) },
                  { upsert: true, useFindAndModify: false },
                  async function (err, result) {
                    if (result) {
                      response.status(200).send({
                        status: "SUCCESS",
                        msg: "Profile Password Updated Successfully",
                      });
                    } else {
                      response.status(404).send({
                        status: "ERROR",
                        msg: "Oops! Something wrong.",
                        err,
                      });
                    }
                  }
                );
              } else {
                response.status(200).send({
                  status: "ERROR",
                  msg: "Oops! Current password not match.",
                  error,
                });
              }
            }
          );
        }
      }
    } catch (error) {
      next(error);
    }
  }
);
