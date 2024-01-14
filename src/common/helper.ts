import { TopicModel } from "../models";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENTID,
    process.env.CLIENTSECRET,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESHTOKEN,
});

export const getIdBySlug = async (slug) => {
    await TopicModel.findOne({ "slug": slug }).then((val) => {
        console.log("getIdBySlug>>>>>>>>>>", val)
        if (val) {
            return val
        } else {
            return {}
        }
    })
}



export const senTMail = async (mailOptions) => {
    try {
        if (mailOptions) {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    clientId: process.env.CLIENTID,
                    clientSecret: process.env.CLIENTSECRET,
                    refreshToken: process.env.REFRESHTOKEN,
                    accessToken: oauth2Client.getAccessToken(),
                },
            })
            let result = transporter.sendMail(mailOptions);
            return result;
        }
    } catch (error) {
        return error
    }

}