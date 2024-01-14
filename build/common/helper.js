"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIdBySlug = void 0;
const models_1 = require("../models");
const getIdBySlug = async (slug) => {
    await models_1.TopicModel.findOne({ "slug": slug }).then((val) => {
        console.log("getIdBySlug>>>>>>>>>>", val);
        if (val) {
            return val;
        }
        else {
            return {};
        }
    });
};
exports.getIdBySlug = getIdBySlug;
//# sourceMappingURL=helper.js.map