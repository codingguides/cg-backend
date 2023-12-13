import { Router, Request, Response, NextFunction } from "express";
import { QuestionModel, RelationModel, NewsletterModel, TopicModel, BlogModel, TagsModel, BlogCategoryModel } from "../../models";
import { body, validationResult } from "express-validator";
import { isEmpty } from "lodash";
import multer from "multer";
const readXlsxFile = require('read-excel-file/node');

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
  
  const filePath =  `C:/Development/codebase/cg-backend/src/controllers/forntend/uploads/${request.file.filename}`;
  //__dirname + '/uploads/' + request.file.filename;
  // console.log("filePath>>>>>",filePath)
  console.log(`C:/Development/codebase/cg-backend/src/controllers/forntend/uploads/${request.file.filename}`)
  readXlsxFile(filePath).then((data) => {
    for (i in data) {
      for (j in data[i]) {
        console.log(data[i][j])
      }
    }
  })

} catch (error) {
  next(error)
}
});