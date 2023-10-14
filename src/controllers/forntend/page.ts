import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, TagsModel, TopicModel } from "../../models";

export const FrontendController = Router();

console.log("<=========================topic -===============>");


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
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

FrontendController.get('/get-side-menu', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find().then(async(val) => {
      if (val) {
        const buildCategoryTree = (categories) => {
          console.log("1")
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
          console.log("2>>>>",tree)
        
          return tree;
        }

        let list = await buildCategoryTree(val);
        if(list){
          response.status(200).send({
            "status": "SUCCESS",
            "msg": "Topics details successfully",
            "payload": list
          });
        }
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

FrontendController.get('/get-side-menu-test', async (request: Request, response: Response, next: NextFunction) => {
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
    

    // let categories = [
    //   {
    //     showNav: true,
    //     _id: '650fd9f6abd17375cc8b5eab',
    //     name: 'JavaScript',
    //     description: '<p>This is JavaScript.</p>\n',
    //     slug: 'javascript',
    //     user_id: '64bced80877787126c3c2b9e'
    //   },
    //   {
    //     showNav: false,
    //     _id: '650fdedbabd17375cc8b5ecf',
    //     name: 'Quiz for Beginners',
    //     description: '<p>You can test your JavaScript skills with &#39;Codingguides&#39; Quiz. The Quiz contains 15 questions each&nbsp;and has no time limit.</p>\n',
    //     slug: 'quiz-for-beginners',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '650fd9f6abd17375cc8b5eab'
    //   },
    //   {
    //     showNav: false,
    //     _id: '650fdfbbabd17375cc8b5ef3',
    //     name: 'JS Beginners Quiz 1',
    //     description: '<p>The Quiz contains 15 questions and there has no time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',      
    //     slug: 'js-beginners-quiz-1',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '650fdedbabd17375cc8b5ecf'
    //   },
    //   {
    //     showNav: false,
    //     _id: '650fdff9abd17375cc8b5f1a',
    //     name: 'JS Beginners Quiz 2',
    //     description: '<p>The Quiz contains 15 questions and there has no time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',      
    //     slug: 'js-beginners-quiz-2',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '650fdedbabd17375cc8b5ecf'
    //   },
    //   {
    //     showNav: false,
    //     _id: '65225e6fe1ab957e28c8e080',
    //     name: 'Quiz for Intermediate',
    //     description: '<p>You can test your JavaScript skills with &#39;Codingguides&#39; Quiz. The Quiz contains 15 questions each and has&nbsp;a time limit.</p>\n',
    //     slug: 'quiz-for-intermediate',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '650fd9f6abd17375cc8b5eab'
    //   },
    //   {
    //     showNav: false,
    //     _id: '6522b557e1ab957e28c8e18d',
    //     name: 'Quiz for Advanced',
    //     description: '<p>You can test your JavaScript skills with &#39;Codingguides&#39; Quiz. The Quiz contains 15 questions each and has&nbsp;a time limit.</p>\n',
    //     slug: 'quiz-for-advanced',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '650fd9f6abd17375cc8b5eab'
    //   },
    //   {
    //     showNav: false,
    //     _id: '6522b71de1ab957e28c8e1d1',
    //     name: 'JS Intermediate Quiz 1',
    //     description: '<p>The Quiz contains 15 questions and there has a time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',       
    //     slug: 'js-intermediate-quiz-1',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '65225e6fe1ab957e28c8e080'
    //   },
    //   {
    //     showNav: false,
    //     _id: '6522b772e1ab957e28c8e1ed',
    //     name: 'JS Intermediate Quiz 2',
    //     description: '<p>The Quiz contains 15 questions and there has a time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',       
    //     slug: 'js-intermediate-quiz-2',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '65225e6fe1ab957e28c8e080'
    //   },
    //   {
    //     showNav: false,
    //     _id: '6522b80de1ab957e28c8e20d',
    //     name: 'JS Advanced Quiz 1',
    //     description: '<p>The Quiz contains 15 questions and there has a time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',       
    //     slug: 'js-advanced-quiz-1',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '6522b557e1ab957e28c8e18d'
    //   },
    //   {
    //     showNav: false,
    //     _id: '6522b88fe1ab957e28c8e22f',
    //     name: 'JS Advanced Quiz 2',
    //     description: '<p>The Quiz contains 15 questions and there has a time limit.&nbsp;You can&#39;t exit from the Quiz once Started.</p>\n',       
    //     slug: 'js-advanced-quiz-2',
    //     user_id: '64bced80877787126c3c2b9e',
    //     parent_id: '6522b557e1ab957e28c8e18d'
    //   }
    // ]

    let cateList = [
      {
        _id: '650fd9f6abd17375cc8b5eab',
        name: 'JavaScript',
        slug: 'javascript'
      },
      {
        _id: '650fdedbabd17375cc8b5ecf',
        name: 'Quiz for Beginners',
        slug: 'quiz-for-beginners',
        parent_id: '650fd9f6abd17375cc8b5eab'
      },
      {
        _id: '650fdfbbabd17375cc8b5ef3',
        name: 'JS Beginners Quiz 1',
        slug: 'js-beginners-quiz-1',
        parent_id: '650fdedbabd17375cc8b5ecf'
      },
      {
        _id: '650fdff9abd17375cc8b5f1a',
        name: 'JS Beginners Quiz 2',
        slug: 'js-beginners-quiz-2',
        parent_id: '650fdedbabd17375cc8b5ecf'
      },
      {
        _id: '65225e6fe1ab957e28c8e080',
        name: 'Quiz for Intermediate',
        slug: 'quiz-for-intermediate',
        parent_id: '650fd9f6abd17375cc8b5eab'
      },
      {
        _id: '6522b557e1ab957e28c8e18d',
        name: 'Quiz for Advanced',
        slug: 'quiz-for-advanced',
        parent_id: '650fd9f6abd17375cc8b5eab'
      },
      {
        _id: '6522b71de1ab957e28c8e1d1',
        name: 'JS Intermediate Quiz 1',
        slug: 'js-intermediate-quiz-1',
        parent_id: '65225e6fe1ab957e28c8e080'
      },
      {
        _id: '6522b772e1ab957e28c8e1ed',
        name: 'JS Intermediate Quiz 2',
        slug: 'js-intermediate-quiz-2',
        parent_id: '65225e6fe1ab957e28c8e080'
      },
      {
        _id: '6522b80de1ab957e28c8e20d',
        name: 'JS Advanced Quiz 1',
        slug: 'js-advanced-quiz-1',
        parent_id: '6522b557e1ab957e28c8e18d'
      },
      {
        _id: '6522b88fe1ab957e28c8e22f',
        name: 'JS Advanced Quiz 2',
        slug: 'js-advanced-quiz-2',
        parent_id: '6522b557e1ab957e28c8e18d'
      }
    ];
    
    const categoryTree = await buildCategoryTree(cateList);
      // console.log(JSON.stringify(categoryTree,null,2));
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

            response.status(404).send({
              "status": "ERROR",
              "msg": "Oops! sub topic not found."
            });
          }
        })
      } else {
        console.log("else")

        response.status(404).send({
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
                response.status(404).send({
                  "status": "ERROR",
                  "msg": "Oops! questions not found."
                });
              }
            })
          } else {
            response.status(404).send({
              "status": "ERROR",
              "msg": "Oops! relation not found."
            });
          }
        })
      } else {
        response.status(404).send({
          "status": "ERROR",
          "msg": "Oops! topic not found."
        });
      }
    })

  } catch (error) {
    next(error)
  }
});
