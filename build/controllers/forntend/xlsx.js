"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxController = void 0;
const express_1 = require("express");
const models_1 = require("../../models");
const multer_1 = __importDefault(require("multer"));
var XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');
exports.XlsxController = (0, express_1.Router)();
// Set up storage for uploaded files
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
// Create the multer instance
const upload = (0, multer_1.default)({ storage: storage });
exports.XlsxController.post('/upload', upload.single("uploadfile"), async (request, response, next) => {
    try {
        let path = request.file.path;
        const { user_id, topic_id } = request.body;
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        if (jsonData.length === 0) {
            return response.status(400).json({
                success: false,
                message: "xml sheet has no data",
            });
        }
        // let savedData = await Lead.create(jsonData);
        const newData = [];
        jsonData.map((singleData) => {
            newData.push(new models_1.QuestionModel({
                "options": [singleData.option1, singleData.option2, singleData.option3, singleData.option4],
                "question": singleData.question,
                "rightoption": singleData.rightoption,
                "point": singleData.point,
                "level": singleData.level,
                "questiontype": singleData.questiontype,
                "user_id": user_id,
                "rightAnswerDescription": singleData.rightAnswerDescription
            }));
        });
        models_1.QuestionModel.insertMany(newData).then(async (docs) => {
            const newRelationArray = [];
            docs.map(async (singleDoc) => {
                newRelationArray.push(new models_1.RelationModel({
                    topic_id: topic_id,
                    question_id: singleDoc._id,
                    type: "topic"
                }));
            });
            await models_1.RelationModel.insertMany(newRelationArray).then((relation) => {
                return response.status(201).json({
                    success: true,
                    questiondata: docs,
                    relationdata: relation,
                    message: " rows added to the database",
                });
            });
        }).catch((err) => {
            return response.status(500).json({ success: false, message: err.message });
        });
    }
    catch (err) {
        return response.status(500).json({ success: false, message: err.message });
    }
});
//# sourceMappingURL=xlsx.js.map