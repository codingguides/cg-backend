import { Router, Request, Response, NextFunction } from "express";
import { BlogModel, BlogCategoryModel } from "../models";
import { check, body, validationResult } from "express-validator";

export const BlogController = Router();

BlogController.post(
  "/add",
  check("title").not().isEmpty().withMessage("Title is required"),
  check("slug").not().isEmpty().withMessage("Slug is required"),
  check("sort_title").not().isEmpty().withMessage("Sort Title is required"),
  check("sort_slug").not().isEmpty().withMessage("Sort Slug is required"),
  check("description").not().isEmpty().withMessage("Description is required"),
  check("status").not().isEmpty().withMessage("Status is required"),
  check("user_id").not().isEmpty().withMessage("user_id is required"),
  check("category_id").not().isEmpty().withMessage("category id is required"),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } else {
        const { body } = request;
        await BlogModel.syncIndexes();
        const data = await BlogModel.find({ slug: body.slug });

        if (data.length > 0) {
          response.status(200).send({
            success: false,
            message: "Blog already exists.",
          });
        } else {
          let QuestionData = new BlogModel({
            title: body.title,
            slug: body.slug,
            sort_title: body.sort_title,
            sort_slug: body.sort_slug,
            description: body.description,
            feature_image: body.feature_image,
            status: body.status,
            question_id: body.question_id,
            user_id: body.user_id,
            category_id: body.category_id,
            topic_id: body.topic_id
          });
          QuestionData.save(function (err, data) {
            if (data) {
              response.status(200).send({
                status: "SUCCESS",
                msg: "Blog Added successfully",
                payload: data,
              });
            } else {
              response.status(404).send({
                status: "ERROR",
                msg: "Oops! something wrong",
                err,
              });
            }
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);

BlogController.put(
  "/update/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { body } = request;
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      await BlogModel.updateOne(
        query,
        body,
        { upsert: true, useFindAndModify: false },
        function (err, result) {
          if (result) {
            response.status(200).send({
              status: "SUCCESS",
              msg:
                result.nModified == 1
                  ? "Blog Succefully Updated"
                  : "Something Wrong Please Try Again",
            });
          } else {
            response.status(404).send({
              status: "ERROR",
              msg: "Oops! Blog not found.",
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

BlogController.delete(
  "/delete/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      await BlogModel.deleteOne(query).then((val) => {
        if (val.deletedCount == 1) {
          response.status(200).send({
            status: "SUCCESS",
            msg: "Blog deleted successfully",
          });
        } else {
          response.status(404).send({
            status: "ERROR",
            msg: "Oops! something wrong, please try again",
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

BlogController.get(
  "/get/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      var ObjectId = require("mongodb").ObjectId;
      var _id = new ObjectId(id);

      const query = { _id: ObjectId(_id) };

      // await BlogModel.findOne(query)
      await BlogModel.aggregate([
        { $match: { '_id': ObjectId(id) } },
        {
          $lookup: {
            from: "blogcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "catDetails"
          },
        },
      ])
        .then((val) => {
          if (val) {
            response.status(200).send({
              status: "SUCCESS",
              msg: "Blog details successfully",
              payload: val,
            });
          } else {
            response.status(404).send({
              status: "ERROR",
              msg: "Oops! Blog not found.",
            });
          }
        });
    } catch (error) {
      next(error);
    }
  }
);

BlogController.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await BlogModel.find().then((val) => {
        if (val) {
          response.status(200).send({
            status: "SUCCESS",
            msg: "Blog details successfully",
            payload: val,
          });
        } else {
          response.status(404).send({
            status: "ERROR",
            msg: "Oops! Blog not found.",
            payload: [],
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

BlogController.put('/', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { limit = 3, page = 1, type, search, status, category } = request.body;
    const count = await BlogModel.count();
    let query = []

    if (type == "title") {
      query = [
        { $match: { title: { '$regex': search, '$options': 'i' } } },
        {
          $lookup: {
            from: "blogcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "blogRelationDetails"
          },
        },
      ]
    } else if (type == "slug") {
      query = [
        { $match: { slug: { '$regex': search, '$options': 'i' } } },
        {
          $lookup: {
            from: "blogcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "blogRelationDetails"
          }
        }
      ]
    } else if (type == "status") {
      query = [
        { $match: { status: status } },
        {
          $lookup: {
            from: "blogcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "blogRelationDetails"
          }
        }
      ]
    } else {
      query = [
        {
          $lookup: {
            from: "blogcategories",
            localField: "category_id",
            foreignField: "_id",
            as: "blogRelationDetails"
          },
        },
      ]
    }

    await BlogModel.aggregate(query)
      .skip((page - 1) * limit)
      .limit(limit * 1)
      .then((val) => {
        if (val) {
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Blog details successfully",
            "payload": val,
            "totalPages": Math.ceil(count / limit),
            "currentPage": page
          });
        } else {
          response.status(404).send({
            "status": "ERROR",
            "msg": "Oops! blog not found.",
            "payload": []
          });
        }
      })
  } catch (error) {
    next(error)
  }
});

BlogController.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      await BlogModel.find().then((val) => {
        if (val) {
          response.status(200).send({
            status: "SUCCESS",
            msg: "Blog details successfully",
            payload: val,
          });
        } else {
          response.status(404).send({
            status: "ERROR",
            msg: "Oops! Blog not found.",
            payload: [],
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// ===================================================================== //

// Get blog relation api
BlogController.get(
  "/get/category/:category",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { category } = request.params;

      await BlogCategoryModel.find({ "category": category }).then((val) => {
        if (val) {
          response.status(200).send({
            status: "SUCCESS",
            msg: "Category details successfully",
            payload: val,
          });
        } else {
          response.status(404).send({
            status: "ERROR",
            msg: "Oops! category not found.",
          });
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// Blog category add vai api
BlogController.post(
  "/category/add",
  check("category").not().isEmpty().withMessage("category is required"),
  check("sub_category").not().isEmpty().withMessage("sub category is required"),
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
      } else {
        const { body } = request;
        await BlogCategoryModel.syncIndexes();
        const data = await BlogCategoryModel.find({ sub_category: body.sub_category });

        if (data.length > 0) {
          response.status(200).send({
            success: false,
            message: "Blog category already exists.",
          });
        } else {
          let QuestionData = new BlogCategoryModel({
            category: body.category,
            sub_category: body.sub_category
          });
          QuestionData.save(function (err, data) {
            if (data) {
              response.status(200).send({
                status: "SUCCESS",
                msg: "Blog Added successfully",
                payload: data,
              });
            } else {
              response.status(404).send({
                status: "ERROR",
                msg: "Oops! something wrong",
                err,
              });
            }
          });
        }
      }
    } catch (error) {
      next(error);
    }
  }
);