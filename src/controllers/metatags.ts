import { Router, Request, Response, NextFunction } from "express";
import { MetaTagsModel } from "../models";
import {check, body, validationResult } from 'express-validator';

export const MetaTagsController = Router();


MetaTagsController.post('/add',

  check('meta_property').not().isEmpty().withMessage('meta property is required'),
  check('meta_description').not().isEmpty().withMessage('meta description is required'),
  check('url').not().isEmpty().withMessage('url is required'),
  check('keyword').not().isEmpty().withMessage('keyword is required'),
  check('slug').not().isEmpty().withMessage('slug is required'),
  async (request: Request, response: Response, next: NextFunction) => {
  try {

  
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    } else {
      const { body } = request;
      await MetaTagsModel.syncIndexes();
      const data = await MetaTagsModel.find({ "meta_property": body.question });

      if (data.length > 0) {
        response.status(200).send({
          "success": false,
          "message": "Meta Tags already exists."
        });
      } else {

        let MetaTagsData = new MetaTagsModel({
          meta_property: body.meta_property,
          meta_description: body.meta_description,
          url: body.url,
          image: body.image,
          keyword: body.keyword,
          slug: body.slug
        });

        MetaTagsData.save(
          function (err, data) {
            if (data) {
              response.status(200).send(MetaTagsData)
            } else if (err) throw err;
          }
        );
      }
    }

  } catch (error) {
    next(error)
  }
});

MetaTagsController.put('/update/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { body } = request;
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await MetaTagsModel.updateOne(
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
            "message": result.nModified == 1 ? "Meta Tags Succefully Updated" : "Something Wrong Please Try Again"
          });
        }
      }
    );

  } catch (error) {
    next(error)
  }
});

MetaTagsController.delete('/delete/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await MetaTagsModel.deleteOne(query).then((val)=>{
      if(val.deletedCount == 1){
        response.status(200).send({
          "success": [
            {
              "msg": "Meta Tags deleted successfully"
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

MetaTagsController.get('/get/:id', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { id } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    var _id = new ObjectId(id);

    const query = { _id: ObjectId(_id) };

    await MetaTagsModel.findOne(query).then((val)=>{
      if(val){
        response.status(200).send({
          "success": [
            {
              "msg": "Meta Tags details successfully",
              "data": val
            }
          ]
        });
      }else{
        response.status(404).send({
          "error": [
            {
              "msg": "Oops! Meta Tags not found."
            }
          ]
        });
      }
      
    })

  } catch (error) {
    next(error)
  }
});


