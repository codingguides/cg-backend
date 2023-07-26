"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
const xrm_core_1 = require("@401_digital/xrm-core");
const express_1 = require("express");
const models_1 = require("../models");
exports.AnalyticsController = express_1.Router();
/*
** API NAME: Add Analytics
** Methode: POST
*/
exports.AnalyticsController.post('/add-analytics', async (request, response, next) => {
    try {
        const { body } = request;
        let status = true;
        await models_1.AnalyticsModel.syncIndexes();
        await models_1.AnalyticsModel.findOne({
            eventValue: body.eventValue
        }).then((res) => {
            if (res) {
                response.status(200).send({ status: false, message: "Already have" });
            }
            else {
                let AnalyticsData = new models_1.AnalyticsModel(body);
                AnalyticsData.save(function (err, data) {
                    if (data) {
                        response.status(200).send(new xrm_core_1.SuccessResponse(data));
                    }
                    else if (err)
                        throw err;
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Video Engagement
** Methode: PUT
*/
exports.AnalyticsController.put('/get-video-engagement/:id', async (request, response, next) => {
    try {
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        const { body } = request;
        let pipeline = [];
        if (body.start && body.end) {
            pipeline = [
                { "$match": {
                        "videoId": ObjectId(id),
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                },
                {
                    "$group": {
                        _id: "$eventAction",
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "eventAction": -1 } },
            ];
        }
        else {
            pipeline = [
                { "$match": { "videoId": ObjectId(id) } },
                {
                    "$group": {
                        _id: "$eventAction",
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "eventAction": -1 } },
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                response.status(200).send({
                    "success": true,
                    "data": res
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video engagement not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Video Wqatch Ratio
** Methode: PUT
*/
exports.AnalyticsController.put('/get-watch-ratio/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let pipeline = [];
        if (body.start && body.end) {
            pipeline = [{
                    "$match": {
                        "videoId": ObjectId(id),
                        "eventAction": "WATCHED",
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                },
                {
                    "$group": {
                        _id: "$template",
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "_id": -1 } }];
        }
        else {
            pipeline = [{
                    "$match": {
                        "videoId": ObjectId(id),
                        "eventAction": "WATCHED"
                    }
                },
                {
                    "$group": {
                        _id: "$template",
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "_id": -1 } }];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                response.status(200).send({
                    "success": true,
                    "data": res.sort((a, b) => a._id - b._id)
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Video Advertisement Engagement
** Methode: PUT
*/
exports.AnalyticsController.put('/get-advertisement-engagement/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let pipeline = [];
        if (body.start && body.end) {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id),
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                },
                {
                    "$group": {
                        _id: {
                            "template": "$template",
                            "eventCategory": "$eventCategory",
                            "eventAction": "$eventAction",
                            "assetsId": "$assetsId",
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        else {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id)
                    }
                },
                {
                    "$group": {
                        _id: {
                            "template": "$template",
                            "eventCategory": "$eventCategory",
                            "eventAction": "$eventAction",
                            "assetsId": "$assetsId",
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                let data = res.filter((data) => data._id.template !== "");
                response.status(200).send({
                    "success": true,
                    "data": data.sort((a, b) => a._id.template - b._id.template) //data
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Video Visit Count
** Methode: PUT
*/
exports.AnalyticsController.put('/visit-count/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        let pipeline = [{}];
        if (body.start && body.end) {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id),
                        "eventAction": "VISIT",
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                }
            ];
        }
        else {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id),
                        "eventAction": "VISIT"
                    }
                }
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                response.status(200).send({
                    "success": true,
                    "data": res.length
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get bar graph data by id
** Methode: PUT
*/
exports.AnalyticsController.put('/getbargraphdata/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        console.log("body>>>>>>>>>>>>>>", body);
        let pipeline = [{}];
        if (body.start && body.end) {
            console.log("if>>>>>>>>>>>>");
            // if(body.day > 29){
            //     pipeline = [
            //         { 
            //             $match: { 
            //                 "videoId": ObjectId(id), 
            //                 "eventAction": "VISIT",
            //                 "updatedAt": { 
            //                     "$gte": new Date(body.start), 
            //                     "$lte": new Date(body.end) 
            //                 }
            //             }
            //         },
            //         {
            //             $group:
            //             {
            //                 _id: {
            //                     $dateToString: {
            //                         "date": "$createdAt",
            //                         "format": "%m"
            //                     }
            //                 }, 
            //                 count: { $sum:1 }
            //             }
            //         }
            //     ]
            // }else{
            pipeline = [
                {
                    $match: {
                        "videoId": ObjectId(id),
                        "eventAction": "VISIT",
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                "date": "$createdAt",
                                "format": "%Y-%m-%d"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
            // }
        }
        else {
            console.log("else>>>>>>>>>>>>");
            pipeline = [
                {
                    $match: {
                        "videoId": ObjectId(id),
                        "eventAction": "VISIT"
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                "date": "$createdAt",
                                "format": "%Y-%m-%d" //"%m"
                            }
                        },
                        count: { $sum: 1 }
                    }
                }
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                console.log("visit res=============>", res);
                response.status(200).send({
                    "success": true,
                    "data": res
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get only viewed campaign engagement timeline by id
** Methode: PUT
*/
exports.AnalyticsController.put('/get-campaign-engagement-timeline-viewed/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        function getDates(startDate, endDate) {
            const dates = [];
            let currentDate = startDate;
            const addDays = function (days) {
                const date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
            };
            while (currentDate <= endDate) {
                dates.push(currentDate.toISOString().slice(0, 10));
                currentDate = addDays.call(currentDate, 1);
            }
            return dates;
        }
        const dates = getDates(new Date(body.start), new Date(body.end));
        if (dates.length > 0) {
            /////////////////////////Viewed//////////////////////////////
            let viewedpipeline = [];
            if (body.start && body.end) {
                // if(body.day > 29){
                //     viewedpipeline = [
                //         {   
                //             "$match": { 
                //                 $and: [
                //                     { "videoId": ObjectId(id)},
                //                     { "eventAction": "VIEWED"},
                //                     {
                //                         "updatedAt": { 
                //                             "$gte": new Date(body.start), 
                //                             "$lte": new Date(body.end) 
                //                         }
                //                     }
                //                 ]
                //             } ,
                //         },
                //         {
                //             "$group": {
                //             "_id": {
                //                 "$dateToString": {
                //                 "format": "%m",
                //                 "date": "$updatedAt"
                //                 },
                //             },
                //             total: {$sum: 1}
                //             }
                //         },
                //         { "$sort": { "updateAt": -1 } }
                //     ]
                // }else{
                viewedpipeline = [
                    {
                        "$match": {
                            $and: [
                                { "videoId": ObjectId(id) },
                                { "eventAction": "VIEWED" },
                                {
                                    "updatedAt": {
                                        "$gte": new Date(body.start),
                                        "$lte": new Date(body.end)
                                    }
                                }
                            ]
                        },
                    },
                    {
                        "$group": {
                            "_id": {
                                "$dateToString": {
                                    "format": "%Y-%m-%d",
                                    "date": "$updatedAt"
                                },
                            },
                            total: { $sum: 1 }
                        }
                    },
                    { "$sort": { "updateAt": -1 } }
                ];
                // }
            }
            else {
                // if(body.day > 29){
                //     viewedpipeline = [
                //         {   
                //             "$match": { 
                //                 $and: [
                //                     { "videoId": ObjectId(id)},
                //                     { "eventAction": "VIEWED"},
                //                 ]
                //             } ,
                //         },
                //         {
                //             "$group": {
                //             "_id": {
                //                 "$dateToString": {
                //                 "format": "%m",
                //                 "date": "$updatedAt"
                //                 },
                //             },
                //             total: {$sum: 1}
                //             }
                //         },
                //         { "$sort": { "updateAt": -1 } }
                //     ]
                // }else{
                viewedpipeline = [
                    {
                        "$match": {
                            $and: [
                                { "videoId": ObjectId(id) },
                                { "eventAction": "VIEWED" },
                            ]
                        },
                    },
                    {
                        "$group": {
                            "_id": {
                                "$dateToString": {
                                    "format": "%Y-%m-%d",
                                    "date": "$updatedAt"
                                },
                            },
                            total: { $sum: 1 }
                        }
                    },
                    { "$sort": { "updateAt": -1 } }
                ];
                // }
            }
            await models_1.AnalyticsModel.aggregate(viewedpipeline).then((res) => {
                if (res) {
                    let data = res.filter((data) => data._id.template !== null);
                    data.sort((a, b) => a._id.template - b._id.template);
                    response.status(200).send({
                        "success": true,
                        "data": data
                    });
                }
                else {
                    response.status(404).send({
                        "success": false,
                        "message": "Oops! video watch ratio not found."
                    });
                }
            });
        }
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get only clicked campaign engagement timeline by id
** Methode: PUT
*/
exports.AnalyticsController.put('/get-campaign-engagement-timeline-clicked/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let clickedpipeline = [];
        if (body.start && body.end) {
            // if(body.day > 29){
            //     clickedpipeline = [
            //         {   
            //             "$match": { 
            //                 $and: [
            //                     { "videoId": ObjectId(id)},
            //                     { "eventAction": "CLICKED"},
            //                     {
            //                         "updatedAt": { 
            //                             "$gte": new Date(body.start), 
            //                             "$lte": new Date(body.end) 
            //                         }
            //                     }
            //                 ]
            //             } ,
            //         },
            //         {
            //             "$group": {
            //             "_id": {
            //                 "$dateToString": {
            //                     "format": "%m",
            //                     "date": "$updatedAt"
            //                 },
            //             },
            //             total: {$sum: 1}
            //             }
            //         },
            //         { "$sort": { "updateAt": -1 } }
            //     ]
            // }else{
            clickedpipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": "CLICKED" },
                            {
                                "updatedAt": {
                                    "$gte": new Date(body.start),
                                    "$lte": new Date(body.end)
                                }
                            }
                        ]
                    },
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d",
                                "date": "$updatedAt"
                            },
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "updateAt": -1 } }
            ];
            // }
        }
        else {
            // if(body.day > 29){
            //     clickedpipeline = [
            //         {   
            //             "$match": { 
            //                 $and: [
            //                     { "videoId": ObjectId(id)},
            //                     { "eventAction": "CLICKED"},
            //                 ]
            //             } ,
            //         },
            //         {
            //             "$group": {
            //             "_id": {
            //                 "$dateToString": {
            //                     "format": "%m",
            //                     "date": "$updatedAt"
            //                 },
            //             },
            //             total: {$sum: 1}
            //             }
            //         },
            //         { "$sort": { "updateAt": -1 } }
            //     ]
            // }else{
            clickedpipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": "CLICKED" },
                        ]
                    },
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d",
                                "date": "$updatedAt"
                            },
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "updateAt": -1 } }
            ];
            // }
        }
        await models_1.AnalyticsModel.aggregate(clickedpipeline).then((res) => {
            if (res) {
                let data = res.filter((data) => data._id.template !== null);
                data.sort((a, b) => a._id.template - b._id.template);
                response.status(200).send({
                    "success": true,
                    "data": data
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get only closed campaign engagement timeline by id
** Methode: PUT
*/
exports.AnalyticsController.put('/get-campaign-engagement-timeline-closed/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let closedpipeline = [];
        if (body.start && body.end) {
            // if(body.day > 29){
            //     closedpipeline = [
            //         {   
            //             "$match": { 
            //                 $and: [
            //                     { "videoId": ObjectId(id)},
            //                     { "eventAction": "CLOSED"},
            //                     {
            //                         "updatedAt": { 
            //                             "$gte": new Date(body.start), 
            //                             "$lte": new Date(body.end) 
            //                         }
            //                     }
            //                 ]
            //             } ,
            //         },
            //         {
            //             "$group": {
            //             "_id": {
            //                 "$dateToString": {
            //                     "format": "%m",
            //                     "date": "$updatedAt"
            //                 },
            //             },
            //             total: {$sum: 1}
            //             }
            //         },
            //         { "$sort": { "updateAt": -1 } }
            //     ]
            // }else{
            closedpipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": "CLOSED" },
                            {
                                "updatedAt": {
                                    "$gte": new Date(body.start),
                                    "$lte": new Date(body.end)
                                }
                            }
                        ]
                    },
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d",
                                "date": "$updatedAt"
                            },
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "updateAt": -1 } }
            ];
            // }
        }
        else {
            // if(body.day > 29){
            //     closedpipeline = [
            //         {   
            //             "$match": { 
            //                 $and: [
            //                     { "videoId": ObjectId(id)},
            //                     { "eventAction": "CLOSED"},
            //                 ]
            //             } ,
            //         },
            //         {
            //             "$group": {
            //             "_id": {
            //                 "$dateToString": {
            //                     "format": "%m",
            //                     "date": "$updatedAt"
            //                 },
            //             },
            //             total: {$sum: 1}
            //             }
            //         },
            //         { "$sort": { "updateAt": -1 } }
            //     ]
            // }else{
            closedpipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": "CLOSED" },
                        ]
                    },
                },
                {
                    "$group": {
                        "_id": {
                            "$dateToString": {
                                "format": "%Y-%m-%d",
                                "date": "$updatedAt"
                            },
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "updateAt": -1 } }
            ];
            // }
        }
        await models_1.AnalyticsModel.aggregate(closedpipeline).then((res) => {
            if (res) {
                let data = res.filter((data) => data._id.template !== null);
                data.sort((a, b) => a._id.template - b._id.template);
                response.status(200).send({
                    "success": true,
                    "data": data
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get campaign engagement ratio by id
** Methode: PUT
*/
exports.AnalyticsController.put('/get-campaign-engagement-ratio/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let pipeline = [];
        if (body.start && body.end) {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id),
                        "updatedAt": {
                            "$gte": new Date(body.start),
                            "$lte": new Date(body.end)
                        }
                    }
                },
                {
                    "$group": {
                        _id: {
                            "eventAction": "$eventAction",
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        else {
            pipeline = [
                {
                    "$match": {
                        "videoId": ObjectId(id)
                    }
                },
                {
                    "$group": {
                        _id: {
                            "eventAction": "$eventAction",
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                let data = res.filter((data) => data._id.template !== "");
                data.sort((a, b) => a._id.template - b._id.template);
                response.status(200).send({
                    "success": true,
                    "data": data
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
/*
** API NAME: Get campaign engagement comparison by id
** Methode: PUT
*/
exports.AnalyticsController.put('/get-template-engagement-comparison/:id', async (request, response, next) => {
    try {
        const { body } = request;
        const { id } = request.params;
        var ObjectId = require('mongodb').ObjectId;
        var _id = new ObjectId(id);
        let pipeline = [];
        if (body.start && body.end) {
            pipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": body.status },
                            {
                                "updatedAt": {
                                    "$gte": new Date(body.start),
                                    "$lte": new Date(body.end)
                                }
                            }
                        ]
                    },
                },
                {
                    "$group": {
                        _id: {
                            "template": "$template",
                            "eventAction": "$eventAction",
                            "eventCategory": "$eventCategory"
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        else {
            pipeline = [
                {
                    "$match": {
                        $and: [
                            { "videoId": ObjectId(id) },
                            { "eventAction": body.status }
                        ]
                    },
                },
                {
                    "$group": {
                        _id: {
                            "template": "$template",
                            "eventAction": "$eventAction",
                            "eventCategory": "$eventCategory"
                        },
                        total: { $sum: 1 }
                    }
                },
                { "$sort": { "template": -1 } }
            ];
        }
        await models_1.AnalyticsModel.aggregate(pipeline).then((res) => {
            if (res) {
                let data = res.filter((data) => data._id.template !== null);
                data.sort((a, b) => a._id.template - b._id.template);
                response.status(200).send({
                    "success": true,
                    "data": data
                });
            }
            else {
                response.status(404).send({
                    "success": false,
                    "message": "Oops! video watch ratio not found."
                });
            }
        });
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=analytics.js.map