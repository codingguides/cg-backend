"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
const { hashPassword } = require("../services/hash");
const bcrypt = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jwt = require("jsonwebtoken");
let key = "KSpYChPbbKRrEIOj685rmY5d7eICGS5t";
let tokenType = "Bearer";
const sgMail = require("@sendgrid/mail");
const express_validator_1 = require("express-validator");
const common_1 = require("../common");
exports.UserController = (0, express_1.Router)();
/*
 ** API NAME: User signup
 ** Methode: POST
 */
exports.UserController.post("/signup", (0, express_validator_1.body)("email", "Invalid Email!").isEmail(), (0, express_validator_1.check)("name").not().isEmpty().withMessage("Name is required"), (0, express_validator_1.check)("loginType").not().isEmpty().withMessage("loginType is required"), async (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(200).send({
            result: "error",
            errors: errors.array(),
        });
    }
    else {
        try {
            const { body } = request;
            await models_1.UserModel.syncIndexes();
            let loginType = ["normal", "google", "linkedin"];
            if (loginType.includes(body.loginType) == false) {
                response.status(200).send({
                    result: "error",
                    errors: [
                        {
                            success: false,
                            msg: "Oops! Wrong login type",
                        },
                    ],
                });
            }
            if (body.loginType == "normal" && body.password == "") {
                response.status(200).send({
                    result: "error",
                    errors: [
                        {
                            success: false,
                            msg: "Password must be at least 8 characters long!",
                        },
                    ],
                });
            }
            const data = await models_1.UserModel.find({ email: body.email });
            if (data.length > 0) {
                response.status(200).send({
                    result: "error",
                    errors: [
                        {
                            success: false,
                            msg: "An Account already exists with this email.",
                        },
                    ],
                });
            }
            else {
                let payloadbody = {};
                if (body.loginType == "normal") {
                    payloadbody = {
                        name: body.name,
                        email: body.email,
                        phone: body.phone,
                        password: await hashPassword(body.password),
                        type: body.type,
                        isdelete: 0,
                        lastlogindate: new Date(),
                        loginType: "normal"
                    };
                }
                else {
                    payloadbody = {
                        name: body.name,
                        email: body.email,
                        type: body.type,
                        isdelete: 0,
                        lastlogindate: new Date(),
                        loginType: body.loginType,
                        profile_pic: body.profile_pic
                    };
                }
                let userData = new models_1.UserModel(payloadbody);
                userData.save(async (err, data) => {
                    if (data) {
                        if (body.loginType == "normal") {
                            response.status(200).send({
                                success: true,
                                message: "Signup successfully.",
                                data: userData,
                            });
                        }
                        else {
                            await models_1.UserModel.updateOne({ email: body.email }, { updatedAt: new Date(), lastlogindate: new Date() }, { upsert: true, useFindAndModify: false }, function (err, result) {
                                if (result) {
                                    console.log("updatedAt update>>>>", result);
                                }
                                else {
                                    console.log("updatedAt error>>>>", err);
                                }
                            });
                            const payload = {
                                id: data._id,
                                name: data["name"],
                                email: data["email"],
                                phone: data["phone"],
                                type: data["type"],
                                pstatus: data["password"] == "" ? false : true
                            };
                            const accessToken = jwt.sign(payload, key, {
                                expiresIn: "30d",
                            });
                            response.status(200).send({
                                result: "ok",
                                data: {
                                    payload,
                                    token: accessToken,
                                },
                            });
                        }
                        // const mailOptions = {
                        //   from: process.env.EMAIL,
                        //   to: body.email,
                        //   subject: "Codingguides Signup Successfully",
                        //   text: "Codingguides Signup Successfully",
                        //   html: `<head>
                        //           <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                        //           <!--[if !mso]><!-->
                        //           <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        //           <!--<![endif]-->
                        //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        //           <title></title>
                        //           <!--[if !mso]><!-->
                        //           <style type="text/css">
                        //               .address-description a {color: #000000 ; text-decoration: none;}
                        //               @media (max-device-width: 480px) {
                        //                 .vervelogoplaceholder {
                        //                   height:83px ;
                        //                 }
                        //               }
                        //           </style>
                        //       </head>
                        //       <body bgcolor="#e1e5e8" style="margin-top:0 ;margin-bottom:0 ;margin-right:0 ;margin-left:0 ;padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;background-color:#e1e5e8;">
                        //         <center style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#e1e5e8;">
                        //           <div style="max-width:600px;margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;">
                        //             <table align="center" cellpadding="0" style="border-spacing:0;font-family:'Muli',Arial,sans-serif;color:#333333;Margin:0 auto;width:100%;max-width:600px;">
                        //               <tbody>
                        //                 <tr>
                        //                   <td align="center" class="vervelogoplaceholder" height="143" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;height:143px;vertical-align:middle;" valign="middle">
                        //                     <span class="sg-image" >
                        //                       <a href="#" target="_blank">
                        //                         <img alt="Codingguides" height="80px" src="http://codingguides.in/assets/images/logo.png"  width="180px">
                        //                       </a>
                        //                     </span>
                        //                   </td>
                        //                 </tr>
                        //                 <!-- Start of Email Body-->
                        //                 <tr>
                        //                   <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
                        //                     <table style="border-spacing:0;" width="100%">
                        //                       <tbody>
                        //                         <tr>
                        //                           <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                        //                             <center>
                        //                               <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Hi ${body.name}, Welcome to codingguides</p>
                        //                             </center>
                        //                           </td>
                        //                         </tr>
                        //                       </tbody>
                        //                     </table>
                        //                   </td>
                        //                 </tr>
                        //                 <tr>
                        //                   <td height="40">
                        //                     <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        //                     <p>&nbsp;</p>
                        //                   </td>
                        //                 </tr>
                        //                 <!-- Social Media -->
                        //                 <tr>
                        //                   <td align="center" style="padding-bottom:0;padding-right:0;padding-left:0;padding-top:0px;" valign="middle">
                        //                       <span class="sg-image" >
                        //                           <a href="https://www.facebook.com/codingguidesofficial" target="_blank">
                        //                               <img alt="Facebook" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/facebook.png" style="border-width: 0px; margin-right: 21px; margin-left: 21px; width: 8px; height: 18px;" width="8">
                        //                           </a>
                        //                       </span>
                        //                       <span class="sg-image">
                        //                           <a href="https://www.linkedin.com/company/codingguides" target="_blank">
                        //                               <img alt="linkedin" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/twiltter.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 23px; height: 18px;" width="23">
                        //                           </a>
                        //                       </span>
                        //                       <span class="sg-image" >
                        //                           <a href="https://www.instagram.com/coding_guides" target="_blank">
                        //                               <img alt="Instagram" height="18" src="https://faneaselive.s3.us-east-2.amazonaws.com/insta.png" style="border-width: 0px; margin-right: 16px; margin-left: 16px; width: 18px; height: 18px;" width="18">
                        //                           </a>
                        //                       </span>
                        //                   </td>
                        //                 </tr>
                        //                 <tr>
                        //                   <td height="25">
                        //                     <p style="line-height: 25px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        //                     <p>&nbsp;</p>
                        //                   </td>
                        //                 </tr>
                        //                 <tr>
                        //                   <td style="padding-top:0;padding-bottom:0;padding-right:30px;padding-left:30px;text-align:center;Margin-right:auto;Margin-left:auto;">
                        //                     <center>
                        //                       <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">Problems or questions
                        //                       </p>
                        //                       <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;font-size:15px;color:#a1a8ad;line-height:23px;">email <a href="mailto:info.codingguides@gmail.com" style="color:#a1a8ad;text-decoration:underline;" target="_blank">info.codingguides@gmail.com</a></p>
                        //                       <p style="font-family:'Muli',Arial,sans-serif;Margin:0;text-align:center;Margin-right:auto;Margin-left:auto;padding-top:10px;padding-bottom:0px;font-size:15px;color:#a1a8ad;line-height:23px;">© <span style="white-space: nowrap">Codingguides,</span> <span style="white-space: nowrap">Kolkata, <span style="white-space: nowrap">INDIA</span></p>
                        //                     </center>
                        //                   </td>
                        //                 </tr>
                        //                 <tr>
                        //                   <td height="40">
                        //                     <p style="line-height: 40px; padding: 0 0 0 0; margin: 0 0 0 0;">&nbsp;</p>
                        //                     <p>&nbsp;</p>
                        //                   </td>
                        //                 </tr>
                        //               </tbody>
                        //             </table>
                        //           </div>
                        //         </center>
                        //       </td></tr></table>
                        //       </center>
                        //       </body>`,
                        // };
                        // await senTMail(mailOptions)
                        //   .then((res) => {
                        //     response.status(200).send({
                        //       success: true,
                        //       message: "Signup successfully.",
                        //       data: userData,
                        //     });
                        //   })
                        //   .catch((error) => {
                        //     response.status(404).send({
                        //       success: false,
                        //       message: "Oops! Mail not send. ",
                        //       error: error,
                        //     });
                        //   });
                    }
                    else if (err)
                        throw err;
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
});
/*
 ** API NAME: User forgot password by id
 ** Methode: POST
 */
exports.UserController.post("/forgot-password", async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.UserModel.findOne({ email: body.email });
        if (data) {
            let mydate = new Date();
            let year = mydate.getFullYear();
            let month = mydate.getMonth();
            let date = mydate.getDate();
            let min = mydate.getMinutes();
            let hour = mydate.getHours() * 60;
            let timestamp = hour + min;
            let obj = {
                day: date,
                month: month,
                year: year,
                timestamp: timestamp,
                id: data._id,
            };
            var encoded = btoa(JSON.stringify(obj));
            let link = `${process.env.URL}/reset-password/${encoded}`;
            const mailOptions = {
                from: process.env.EMAIL,
                to: body.email,
                subject: "Forgot Password",
                text: "This is a test email sent using Nodemailer and Gmail.",
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
                              <td align="center" class="inner" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;" valign="middle">
                                  <span class="sg-image" >
                                      <img alt="Forgot Password" class="banner" height="157px" src="https://faneaselive.s3.us-east-2.amazonaws.com/emailtemplate.jpeg" style="border-width: 0px; margin-top: 30px; width: 255px; height: 150px;" width="255">
                                  </span>
                              </td>
                            </tr>
                            <tr>
                              <td class="inner contents center" style="padding-top:15px;padding-bottom:15px;padding-right:30px;padding-left:30px;text-align:left;">
                                <center>
                                    <p class="h1 center" style="Margin:0;text-align:center;font-family:'flama-condensed','Arial Narrow',Arial;font-weight:100;font-size:30px;Margin-bottom:26px;">Forgot Your Password?</p>
                                    <p class="description center" style="font-family:'Muli','Arial Narrow',Arial;Margin:0;text-align:center;max-width:320px;color:#a1a8ad;line-height:24px;font-size:15px;Margin-bottom:10px;margin-left: auto; margin-right: auto;">
                                        <span style="color: rgb(161, 168, 173); font-family: Muli, &quot;Arial Narrow&quot;, Arial; font-size: 15px; text-align: center; background-color: rgb(255, 255, 255);">
                                          Click Link Below To Reset Your Password
                                        </span>
                                    </p>
                                    <h3>This link will be valid upto 15 minutes. </h3>
                                    <span class="sg-image" >
                                      <a href="${link}" target="_blank">
                                          <img alt="Reset your Password" height="54" src="https://marketing-image-production.s3.amazonaws.com/uploads/c1e9ad698cfb27be42ce2421c7d56cb405ef63eaa78c1db77cd79e02742dd1f35a277fc3e0dcad676976e72f02942b7c1709d933a77eacb048c92be49b0ec6f3.png" style="border-width: 0px; margin-top: 30px; margin-bottom: 50px; width: 260px; height: 54px;" width="260">
                                      </a>
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
            await (0, common_1.senTMail)(mailOptions)
                .then((res) => {
                response.status(200).send({
                    success: true,
                    message: "Email sent successfully.",
                    data: res,
                });
            })
                .catch((error) => {
                response.status(404).send({
                    success: false,
                    message: "Oops! Mail not send. ",
                    error: error,
                });
            });
        }
        else {
            response.status(404).send({
                success: false,
                message: "Oops! email not found.",
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
 ** API NAME: User reset password by id
 ** Methode: PUT
 */
exports.UserController.put("/reset-password/:id", async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require("mongodb").ObjectId;
        var _id = new ObjectId(id);
        const query = { _id: ObjectId(_id) };
        let newpass = await hashPassword(body.password);
        await models_1.UserModel.updateOne(query, {
            password: newpass,
        }, { upsert: true, useFindAndModify: false }, function (err, result) {
            if (err) {
                response.status(404).send({
                    error: true,
                    data: err,
                    message: "Something Wrong Please Try Again",
                });
            }
            else {
                response.status(200).send({
                    success: true,
                    message: "Password Succefully Updated",
                    data: result,
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
 ** API NAME: User login
 ** Methode: POST
 */
exports.UserController.post("/login", (0, express_validator_1.body)("email", "Invalid Email!").isEmail(), (0, express_validator_1.check)("loginType").not().isEmpty().withMessage("loginType is required"), async (request, response, next) => {
    const errors = (0, express_validator_1.validationResult)(request);
    if (!errors.isEmpty()) {
        return response.status(200).send({
            errors: errors.array(),
        });
    }
    else {
        try {
            const { body } = request;
            const data = await models_1.UserModel.findOne({ email: body.email });
            let status = false;
            if (data) {
                status = true;
                let loginType = ["normal", "google", "linkedin"];
                if (loginType.includes(body.loginType) == false) {
                    response.status(400).send({
                        result: "error",
                        errors: [
                            {
                                success: false,
                                msg: "Oops! Wrong login type",
                            },
                        ],
                    });
                }
                if (body.loginType == "normal" && body.password == "") {
                    response.status(200).send({
                        result: "error",
                        errors: [
                            {
                                success: false,
                                msg: "Password must be at least 8 characters long!",
                            },
                        ],
                    });
                }
                if (body.loginType == "normal") {
                    console.log("if data");
                    bcrypt.compare(body.password, data["password"], async function (err, result) {
                        if (err)
                            throw err;
                        if (result) {
                            console.log("if bcrypt");
                            status = true;
                        }
                        else {
                            status = false;
                        }
                    });
                }
                if (status == true) {
                    await models_1.UserModel.updateOne({ email: body.email }, { updatedAt: new Date(), lastlogindate: new Date() }, { upsert: true, useFindAndModify: false }, function (err, result) {
                        if (result) {
                            console.log("updatedAt update>>>>", result);
                        }
                        else {
                            console.log("updatedAt error>>>>", err);
                        }
                    });
                    const payload = {
                        id: data._id,
                        name: data["name"],
                        email: data["email"],
                        phone: data["phone"],
                        type: data["type"],
                        pstatus: data["password"] == "" ? false : true
                    };
                    const accessToken = jwt.sign(payload, key, {
                        expiresIn: "30d",
                    });
                    response.status(200).send({
                        result: "ok",
                        data: {
                            payload,
                            token: accessToken,
                        },
                    });
                }
                else {
                    response.status(200).send({
                        errors: [
                            {
                                msg: "Oops! Password not matched",
                                param: "password",
                            },
                        ],
                    });
                }
            }
            else {
                response.status(200).send({
                    errors: [
                        {
                            msg: "Oops! Email not found",
                            param: "email",
                        },
                    ],
                });
            }
        }
        catch (error) {
            next(error);
        }
    }
});
exports.UserController.post("/social-login", async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.UserModel.findOne({ email: body.email });
        if (data) {
            console.log("if data");
            response.status(200).send({
                status: true,
                nextcall: 'signin'
            });
        }
        else {
            response.status(200).send({
                status: true,
                nextcall: 'signup'
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=user.js.map