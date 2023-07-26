"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BiController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
const multer = require('multer');
var store = require('store');
var moment = require('moment');
//////////////////////////////////////////////////////////////
const XLSX = require('xlsx');
const excel = require('exceljs');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(">>>>>>>>>>>>destination req.body>>>>>>>>", req.body.userId);
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        console.log(">>>>>>>>>>>> req.body.userId filename >>>>>>>>>>>>>>>>>>", req.body.userId);
        // var datetimestamp = Date.now();
        cb(null, req.body.userId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        // cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({ storage: storage });
function validate(req, res, next) {
    if (!req.file) {
        console.log(">>>>>>>>>>>> req.file >>>>>>>>>>>>>>>>>>", req.file);
        return res.send({
            errors: {
                message: 'file cant be empty'
            }
        });
    }
    next();
}
//////////////////////////////////////////////////////////////
exports.BiController = express_1.Router();
exports.BiController.post('/add-bi', async (request, response, next) => {
    try {
        const { body } = request;
        console.clear();
        console.log("body===========>", body);
        // const data = await BIModel.findOne({ videoTitle: body.videoTitle });
        // if (data) {
        //     response.status(StatusCodes.NOT_FOUND).send({
        //         "success": false,
        //         "message": "Oops! video title already added."
        //     });
        // } else {
        let biData = new models_1.BIModel(body);
        biData.save(function (err, data) {
            if (data) {
                return data;
            }
            else if (err)
                throw err;
            console.error("ERROR:> ", err);
        });
        response.status(xrm_core_1.StatusCodes.OK).send(new xrm_core_1.SuccessResponse(biData));
        // }
    }
    catch (error) {
        next(error);
    }
});
exports.BiController.post('/bi-count', async (request, response, next) => {
    try {
        const { body } = request;
        console.clear();
        console.log("body===========>", body);
        models_1.BIModel.find({ "userId": body.userId }).count(function (err, count) {
            if (count) {
                response.status(200).send({
                    "success": true,
                    "count": count
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "count": 0
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BiController.post('/labour-sales', async (request, response, next) => {
    try {
        const { body } = request;
        console.clear();
        const startOfMonth = moment(`${request.body.year}-${request.body.month}-01`).clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const endOfMonth = moment(`${request.body.year}-${request.body.month}-30`).clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');
        console.log("startOfMonth>>>>>>>>>>>>>>>>>>>", startOfMonth);
        console.log("endOfMonth>>>>>>>>>>>>>>>>>>>", endOfMonth);
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        models_1.BIModel
            .find({
            "userId": body.userId,
            "CurrentDate": {
                $gte: startOfMonth,
                $lt: endOfMonth
            }
        })
            .sort({ CurrentDate: 1 })
            .then((val) => {
            if (val) {
                response.status(200).send({
                    "success": true,
                    "count": val.filter(item => {
                        let date = new Date(item['CurrentDate']);
                        return date.getUTCMonth() + 1 == request.body.month && date.getFullYear() == request.body.year;
                    })
                });
            }
            else {
                response.status(200).send({
                    "success": true,
                    "count": " Oops something wrong"
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
// BiController.post('/upload', 
//   upload.single('upload'), 
//   validate, 
//   async function (req, res) {
//     if(req.body && !req.body.userId){
//       res.status(404).send({
//         "success": true,
//         "message": "Oops! no user found."
//       });
//     }
//     let user = req.body.userId;
//     // console.log(">>>>>>>>>>>> userId123 >>>>>>>>>>>>>>>>>>",req.body.userId)
//     var ObjectId = require('mongodb').ObjectId; 
//     let succesmessage = []
//     const fileLocation = req.file.path;  
//     // console.log(">>>>>>>>>>>> fileLocation >>>>>>>>>>>>>>>>>>",fileLocation)
//     let wb= XLSX.readFile(fileLocation, {type: "buffer"});
//     const wsname = wb.SheetNames[0];
//     let rawData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
//     let lastUniqueId = ""
//     rawData.map(async (data,i)=>{
//       data.userId = ObjectId(user)
//       // let createuniqueId = `${data.InvoiceNumber}_${data.JobNumber}_${user}`
//       let createuniqueId = data.InvoiceNumber;
//       data.uniqueId = createuniqueId;
//       data.CurrentDate = new Date(Math.round((data.CurrentDate - 25569)*86400*1000));
//       data.BookingCreatedDate = new Date(Math.round((data.BookingCreatedDate - 25569)*86400*1000));
//       if (i === rawData.length - 1) {
//         lastUniqueId = createuniqueId;
//         data.BookingCreatedDate = "123"
//       }
//       // console.log("data.CurrentDate>>>>>>>>>>>>>>>>>>>>",data.CurrentDate,"data.BookingCreatedDate>>>>>>>>>>>>>>>>>>>>",data.BookingCreatedDate)
//     })
//     let flag = 0;
//     BiLogModel.find({ userId : ObjectId(user)}).then((found) =>{
//       if(found && found.length > 0 ){
//         let filtered = [];
//         let filtered2 = [];
//         flag = 1
//         let newflag = 0;
//         rawData.map((arr,i)=>{
//           let unique = arr['InvoiceNumber'];
//           if(found[0]['uniqueId'] == unique){
//             newflag = 1
//             filtered2.push(arr)
//           }else{
//             filtered.push(arr)
//           }
//         })
//         return filtered2.length > 0 ? filtered2 : filtered;
//       }else{
//         flag = 0
//         return rawData;
//       }
//     }).then(async (newData)=>{
//       console.log("newData>>>length>>>>>>>",newData.length)
//       Promise.all(newData.map(chunk => BIModel.insertMany(chunk)))
//       .then( dep => {
//         BIModel.find().sort({_id:-1}).limit(1).then(async (lastInserted)=>{
//           if(lastInserted.length > 0){
//             if(flag == 1){
//               await BiLogModel.updateOne(
//                 { "userId" : user }, 
//                 { 
//                     $set: {
//                       "uniqueId" : `${lastInserted[0]['InvoiceNumber']}_${lastInserted[0]['JobNumber']}_${user}`,
//                       "count" : newData.length
//                     }
//                 }
//               ).then((res)=>{
//                   // console.log("res>>>>>>>>>>>>>>>",res)
//               })
//             }else{
//               let bilogData= new BiLogModel({
//                 "userId" : user,
//                 "uniqueId" : `${lastInserted[0]['InvoiceNumber']}_${lastInserted[0]['JobNumber']}_${user}`,
//                 "count" : newData.length
//               });
//               bilogData.save(function(err, data){
//                   // console.log("data>>>>>>>>>",data)
//                   // console.error("ERROR:> ",err);
//               });
//             }
//           }
//         })
//         res.status(200).send({
//           "success": true,
//           "message": dep
//         });
//       })
//       .catch(err => {
//         console.log(err)
//         res.status(200).send({
//           "success": false,
//           "message": err
//         });
//       })
//     })
// });
exports.BiController.post('/upload', upload.single('upload'), validate, async function (req, res) {
    if (req.body && !req.body.userId) {
        res.status(404).send({
            "success": true,
            "message": "Oops! no user found."
        });
    }
    // const startOfMonth = moment(`${req.body.year}-${req.body.month}-01`). clone(). startOf('month'). format('YYYY-MM-DD HH:mm:ss');
    // const endOfMonth = moment(`${req.body.year}-${req.body.month}-30`). clone(). endOf('month'). format('YYYY-MM-DD HH:mm:ss');
    let user = req.body.userId;
    // console.log(">>>>>>>>>>>> userId123 >>>>>>>>>>>>>>>>>>",req.body.userId)
    var ObjectId = require('mongodb').ObjectId;
    let succesmessage = [];
    const fileLocation = req.file.path;
    // console.log(">>>>>>>>>>>> fileLocation >>>>>>>>>>>>>>>>>>",fileLocation)
    let wb = XLSX.readFile(fileLocation, { type: "buffer" });
    const wsname = wb.SheetNames[0];
    let rawData = XLSX.utils.sheet_to_json(wb.Sheets[wsname]);
    let insertedcount = 0;
    let uninsertedcount = 0;
    new Promise(function (resolve, reject) {
        rawData.map(async (data, i) => {
            data.userId = ObjectId(user);
            let createuniqueId = data.InvoiceNumber;
            data.uniqueId = createuniqueId;
            data.CurrentDate = new Date(Math.round((data.CurrentDate - 25569) * 86400 * 1000));
            data.BookingCreatedDate = new Date(Math.round((data.BookingCreatedDate - 25569) * 86400 * 1000));
            await models_1.BIModel
                .find({
                "userId": user,
                "InvoiceNumber": data.InvoiceNumber
            }).then(async (resdata) => {
                console.log(data.InvoiceNumber, ">>>>>>resdata>>>", resdata.length > 0 ? resdata[0]['InvoiceNumber'] : resdata);
                if (resdata.length == 0) {
                    let biData = new models_1.BIModel(data);
                    await biData.save(function (err, savedata) {
                        console.log(data, "data>>>>", savedata);
                        insertedcount++;
                    });
                }
                console.log(rawData.length - 1, ">>>>>>>>>>>>>>>>>>", i);
            });
            if ((rawData.length - 3) == i) {
                console.log(rawData.length, ">>>>>>>>>last>>>>>>>>>", i);
                setTimeout(() => {
                    resolve(insertedcount);
                }, 2000);
            }
        });
    }).then((done) => {
        res.status(200).send({
            "success": true,
            "message": done
        });
    }).catch((err) => {
        res.status(200).send({
            "success": false,
            "message": err
        });
    });
});
//# sourceMappingURL=bi.js.map