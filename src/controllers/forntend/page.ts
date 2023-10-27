import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, NewsletterModel, TopicModel } from "../../models";
import { body, validationResult } from "express-validator";
import { isEmpty } from "lodash";

export const FrontendController = Router();

FrontendController.get('/get-menu', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find({ "showNav": true }).then((val) => {
      if (val) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Topics details successfully",
          "payload": val
        });
      } else {
        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

FrontendController.get('/get-sidebar-menu', async (request: Request, response: Response, next: NextFunction) => {
  try {

    
    async function buildCategoryTree(categories) {
      const categoryMap = {}; // Use a map for faster lookups

      // Create a map of categories using _id as keys
      categories.forEach(category => {
        categoryMap[category._id] = category;
        category.children = [];
      });
      
      const tree = [];
    
      // Organize categories into a tree structure
      categories.forEach(category => {
        if (category.parent_id) {
          const parentCategory = categoryMap[category.parent_id];
          if (parentCategory) {
            parentCategory.children.push(category);
          }
        } else {
          tree.push(category);
        }
      });
    
      return tree;
    }
    

    let cateList = []
    let obj = {}
    await TopicModel.find().then((topicList)=>{
      topicList.map((topic)=>{

        if(topic.parent_id){
          obj = {
            _id: String(topic._id),
            name: String(topic.name),
            slug: String(topic.slug),
            parent_id: String(topic.parent_id)
          }
        }else{
          obj = {
            _id: String(topic._id),
            name: String(topic.name),
            slug: String(topic.slug)
          }
        }
        cateList.push(obj)
      })
    })
    
    const categoryTree = await buildCategoryTree(cateList);
      if(categoryTree){ 
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Topics details successfully",
          "payload": categoryTree
        });
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }

  } catch (error) {
    next(error)
  }
});

FrontendController.get('/get-quiz-list/:slug', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { slug } = request.params;
    var ObjectId = require('mongodb').ObjectId;

    await TopicModel.findOne({ "slug": slug }).then(async (val) => {
      console.log(val)
      console.log(val._id)
      if (val && val._id) {
        console.log("if")
        await TopicModel.find({ "parent_id": ObjectId(val._id) }).then((sublist) => {
          if (sublist) {
            console.log("sublist if", sublist)
            response.status(200).send({
              "status": "SUCCESS",
              "msg": "Sub Topics details successfully",
              "payload": sublist
            });
          } else {
            console.log("sub else")

            response.status(200).send({
              "status": "ERROR",
              "msg": "Oops! sub topic not found."
            });
          }
        })
      } else {
        console.log("else")

        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! slug not found."
        });
      }
    })

  } catch (error) {
    next(error)
  }
});

FrontendController.get('/quiz/:slug', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { slug } = request.params;
    var ObjectId = require('mongodb').ObjectId;
    await TopicModel.findOne({ "slug": slug }).then(async (val) => {
      console.log("val>>>>>>>>>>>>>", val)
      if (val && val._id) {
        await RelationModel.find({ 'topic_id': ObjectId(val._id) }, { question_id: 1 }).then(async (relationdata) => {
          const relationIds = relationdata.map((rel) => ObjectId(rel.question_id))
          console.log(relationIds, "<<<<<<<<<<<<relationdata>>>>>>>>>>>>>", relationdata)
          if (relationdata) {
            await QuestionModel.find({ _id: { $in: relationIds } }).then(async (questions) => {
              console.log("questions>>>>>>>>>>>>>", questions)
              if (questions) {
                response.status(200).send({
                  "status": "SUCCESS",
                  "msg": "Questions details successfully",
                  "payload": questions
                });
              } else {
                response.status(200).send({
                  "status": "ERROR",
                  "msg": "Oops! questions not found."
                });
              }
            })
          } else {
            response.status(200).send({
              "status": "ERROR",
              "msg": "Oops! relation not found."
            });
          }
        })
      } else {
        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! relation not found."
        });
      }
    })

  } catch (error) {
    next(error)
  }
});

FrontendController.post('/newsletter', body('email', "Invalid Email!").isEmail(),
  async (request: Request, response: Response, next: NextFunction) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(200).send({
        result: 'error',
        "errors": errors.array()
      });
    } else {
      try {
        const { body } = request;
        await NewsletterModel.syncIndexes();
        const data = await NewsletterModel.find({
          $or: [
            { "email": body.email }
          ]
        });

        if (data.length > 0) {
          response.status(200).send({
            result: 'error',
            "errors": [
              {
                "success": false,
                "msg": "This email already exists in our system."
              }
            ]
          });
        } else {
          let userData = new NewsletterModel({
            email: body.email
          });
          userData.save(
            function (err, data) {
              if (data) {
                response.status(200).send({
                  result: 'success',
                  "success": [
                    {
                      "success": true,
                      "msg": "We will get back to you soon."
                    }
                  ]
                });
              } else if (err) throw err;
            }
          );
        }
      } catch (error) {
        next(error)
      }
    }
});