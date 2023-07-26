"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignupController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
const { hashPassword } = require('../services/hash');
const nodemailer = require("nodemailer");
function randomPassword(length) {
    var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
    var pass = "";
    for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
    }
    return pass;
}
exports.SignupController = express_1.Router();
exports.SignupController.post('/signup', async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.UserModel.findOne({ phone: body.phone });
        //console.log("data===========>",data)
        if (data) {
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "message": "Oops! phone number already registered."
            });
        }
        else {
            let userData = new models_1.UserModel({
                name: body.name,
                email: body.email,
                phone: body.phone,
                password: await hashPassword(body.password),
                role: body.role,
                isdelete: 0,
                lastlogindate: new Date()
            });
            userData.save(function (err, data) {
                if (data) {
                    return data;
                }
                else if (err)
                    throw err;
                console.error("ERROR:> ", err);
            });
            response.status(xrm_core_1.StatusCodes.OK).send(new xrm_core_1.SuccessResponse(userData));
        }
    }
    catch (error) {
        next(error);
    }
});
exports.SignupController.post('/forgot-password', async (request, response, next) => {
    try {
        const { body } = request;
        const data = await models_1.UserModel.findOne({ email: body.email });
        console.log("data===========>", data);
        if (data) {
            var newpassword = randomPassword(8);
            var hPass = await hashPassword(newpassword);
            models_1.UserModel.updateOne({ email: body.email }, { password: hPass })
                .then(async (result) => {
                //const { matchedCount, modifiedCount } = result;
                if (result.nModified = 1) {
                    ///////////////////////////////
                    async function main() {
                        let testAccount = await nodemailer.createTestAccount();
                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 465,
                            secure: false,
                            auth: {
                                user: "rumpanaskar766@gmil.com",
                                pass: "ujanprodhan",
                            },
                        });
                        // send mail with defined transport object
                        let info = await transporter.sendMail({
                            from: '"Fred Foo 👻" <foo@example.com>',
                            to: "paulswarnabha@gmail.com",
                            subject: "Hello ✔",
                            text: "Hello world?",
                            html: "<b>Hello world?</b>",
                        });
                        console.log("Message sent: %s", info.messageId);
                        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                        // Preview only available when sending through an Ethereal account
                        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    }
                    main().catch(console.error);
                    ///////////////////////////////
                    response.status(xrm_core_1.StatusCodes.OK).send({
                        "success": true,
                        "message": "Updated"
                    });
                }
            }).catch(err => {
                response.status(xrm_core_1.StatusCodes.OK).send({
                    "success": false,
                    "message": err
                });
            });
        }
        else {
            response.status(xrm_core_1.StatusCodes.NOT_FOUND).send({
                "success": false,
                "message": "Oops! email not found."
            });
        }
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=signup.js.map