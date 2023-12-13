import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel } from "../../models";
import multer from "multer";
var XLSX = require("xlsx");


const fs = require('fs');
const path = require('path');

export const XlsxController = Router();


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'C:/Development/codebase/cg-backend/src/controllers/forntend/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });

XlsxController.post('/upload', upload.single("uploadfile"), async (request: Request, response: Response, next: NextFunction) => {
  try {
    let path = request.file.path;
    const { user_id } = request.body;

    var workbook = XLSX.readFile(path);
    var sheet_name_list = workbook.SheetNames;
    let jsonData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]]
    );
    if (jsonData.length === 0) {
      return response.status(400).json({
        success: false,
        message: "xml sheet has no data",
      });
    }
    // let savedData = await Lead.create(jsonData);
    const newData = []
    const newMap = jsonData.map((singleData)=>{
      newData.push(new QuestionModel({ 
        "options": [singleData.option1, singleData.option2 , singleData.option3, singleData.option4],
        "question": singleData.question,
        "rightoption": singleData.rightoption,
        "point": singleData.point,
        "level": singleData.level,
        "questiontype": singleData.questiontype,
        "user_id": user_id,
        "rightAnswerDescription": singleData.rightAnswerDescription
      }))
    })

    QuestionModel.insertMany(newData).then((docs) => {
      return response.status(201).json({
        success: true,
        data: docs,
        message: " rows added to the database",
      });
    }).catch((err) => {
      return response.status(500).json({ success: false, message: err.message });
    })
    
  } catch (err) {
    return response.status(500).json({ success: false, message: err.message });
  }
});