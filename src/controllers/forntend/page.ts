import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, NewsletterModel, TopicModel, BlogModel, TagsModel, BlogCategoryModel } from "../../models";
import { body, validationResult } from "express-validator";
import { senTMail } from '../../common';


export const FrontendController = Router();

FrontendController.get('/get-menu', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find({ "showNav": true }).sort({ index_no: 1 }).then((val) => {
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

FrontendController.get('/get-feature-item', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await TopicModel.find({ "showFeatures": true }).sort({ index_no: 1 }).then((val) => {
      if (val) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Features details successfully",
          "payload": val
        });
      } else {
        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! features not found."
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
    await TopicModel.find().then((topicList) => {
      topicList.map((topic) => {

        if (topic.parent_id) {
          obj = {
            _id: String(topic._id),
            name: String(topic.name),
            slug: String(topic.slug),
            parent_id: String(topic.parent_id)
          }
        } else {
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
    if (categoryTree) {
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

FrontendController.get('/search/:topic', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { topic } = request.params;
    await TagsModel.aggregate([
      { $match: { 'name': { '$regex': topic.toUpperCase() }, type: 'topic' } },
      {
        $lookup: {
          from: "topics",
          localField: "topic_id",
          foreignField: "_id",
          as: "topicDetails"
        },
      }
    ]).then(async (val) => {
      console.log(val)
      let newarray = [];
      if (val) {
        val.map(async (value) => {
          if (value.topicDetails.length > 0) {
            if (value.topicDetails[0].parent_id == null) {
              await newarray.push(value.topicDetails[0]);
            }
          }
        })
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Topics details successfully",
          "payload": newarray
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
          userData.save(async (err, data) => {
            if (data) {

              const mailOptions = {
                from: process.env.EMAIL,
                to: body.email,
                subject: "Get in touch with Codingguide",
                text: "Get in touch with Codingguide",
                html: `<head>
                        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        <!--[if !mso]><!-->
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <!--<![endif]-->
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title></title>
                        <!--[if !mso]><!-->
                        <style type="text/css">
                            .address-description a {color: #000000 ; text-decoration: none;}
                            @media (max-device-width: 480px) {
                              .vervelogoplaceholder {
                                height:83px ;
                              }
                            }
                        </style>
                    </head>
                    
                    <body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
                      <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                        <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                          <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                            <tbody>
                              <tr>
                                <td align="center" class="vervelogoplaceholder" height="143" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;height:143px;vertical-align:middle;" valign="middle">
                                  <span class="sg-image" >
                                    <a href="#" target="_blank">
                                      <img alt="Codingguides" height="80px" src="http://codingguides.in/assets/images/logo.png"  width="180px">
                                    </a>
                                  </span>
                                </td>
                              </tr>
                              <!-- Start of Email Body-->
                              <tr>
                                <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                                  <table style="border-spacing:0;" width="100%">
                                    <tbody>
                                      <tr>
                                        <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                          <center>
                                              <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Hi, Don't Miss Out On This Opportunity</p>
                                              
                                              <h3>Unlock The Potential Of Your Skills & Stay Upskilled </h3>
                                              <span class="sg-image" >
                                                <a href="http://codingguides.in/" height="54" target="_blank" style="border-width: 0px; margin-top: 30px; margin-bottom: 50px; width: 260px; height: 54px;" width="260"> Check out new update </a>
                                              </span>
                                          </center>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td height="40">
                                  <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                                  <p>&nbsp;</p>
                                </td>
                              </tr>
                              <!-- Social Media -->
                              <tr>
                                <td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle">
                                    <span class="sg-image" >
                                        <a href="https://www.facebook.com/codingguidesofficial" target="_blank">
                                            <img alt="Facebook" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/facebook.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8">
                                        </a>
                                    </span>
                                    <span class="sg-image">
                                        <a href="https://www.linkedin.com/company/codingguides" target="_blank">
                                            <img alt="linkedin" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/twiltter.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23">
                                        </a>
                                    </span>
                                    <span class="sg-image" >
                                        <a href="https://www.instagram.com/coding_guides" target="_blank">
                                            <img alt="Instagram" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/insta.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18">
                                        </a>
                                    </span>
                                </td>
                              </tr>
                              <tr>
                                <td height="25">
                                  <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                                  <p>&nbsp;</p>
                                </td>
                              </tr>
                              <tr>
                                <td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
                                  <center>
                                    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Problems or questions
                                    </p>
                                    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">email <a href="mailto:info.codingguides@gmail.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">info.codingguides@gmail.com</a></p>
                                    <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;padding-top:10px;padding-bottom:0px;font-size:15px;color:#a1a8ad;line-height:23px;">© <span style="white-space: nowrap">Codingguides,</span> <span style="white-space: nowrap">Kolkata, <span style="white-space: nowrap">INDIA</span></p>
                                  </center>
                                </td>
                              </tr>
                              <tr>
                                <td height="40">
                                  <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                                  <p>&nbsp;</p>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </center>
                    </td></tr></table>
                    </center>
                    </body>`,
              };

              await senTMail(mailOptions).then((res) => {
                response.status(200).send({
                  "success": true,
                  "msg": "We will get back to you soon."
                });
              }).catch((error) => {
                response.status(404).send({
                  "success": false,
                  "message": "Oops! Mail not send. ",
                  "error": error
                });
              })

            } else if (err) throw err;
          }
          );
        }
      } catch (error) {
        next(error)
      }
    }
  });

FrontendController.get('/blog', async (request: Request, response: Response, next: NextFunction) => {
  try {

    await BlogModel.find().limit(10).then((val) => {
      if (val) {
        response.status(200).send({
          "status": "SUCCESS",
          "msg": "Blog details successfully",
          "payload": val
        });
      } else {
        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! blog not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});

// For forntend example details page
FrontendController.get('/blog/:slug', async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { slug } = request.params;

    await TopicModel.findOne({ "slug": slug }).then(async (val) => {
      if (val) {
        await BlogCategoryModel.syncIndexes();
        await BlogCategoryModel.aggregate([
          { $match: { 'category': { '$regex': slug } } },
          {
            $lookup: {
              from: "blogs",
              localField: "_id",
              foreignField: "category_id",
              as: "blogDetails"
            },
          },
          { $sort: { category: 1 } }
        ]).then(async (res) => {
          if (res) {
            response.status(200).send({
              "status": "SUCCESS",
              "msg": "Blog details successfully",
              "payload": {
                "topic": val,
                "res": res
              }
            });
          } else {
            response.status(200).send({
              "status": "ERROR",
              "msg": "Oops! Relation not found."
            });
          }

        })


      } else {
        response.status(200).send({
          "status": "ERROR",
          "msg": "Oops! blog not found."
        });
      }

    })

  } catch (error) {
    next(error)
  }
});