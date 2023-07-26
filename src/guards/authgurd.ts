// import { CryproHelper, TokensHelper, AppException, StatusCodes  } from '@401_digital/xrm-core';
var jwt = require('jsonwebtoken');
let key = "KSpYChPbbKRrEIOj685rmY5d7eICGS5t";
import { UserModel } from "../models";
var ObjectId = require('mongodb').ObjectId; 

export const Authguard = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            // AppException.create(StatusCodes.UNAUTHORIZED_ACCESS, 'User is not authorised')
            throw new Error('User is not authorised');
        }else{
            const payload = await jwt.verify(authorization, key);
            console.log("payload>>>>>>>>>>>>>",payload)
            // Find user
            let user = await UserModel.findOne({ email: payload.email });
            if (!user) { throw new Error('No user found'); }
            if (user['isdelete'] === true) {
                throw new Error('Your account has been De-Activated. Please contact Admin.');
            }
        }
        next();
    } catch (error) {
        next(error)
    }
}