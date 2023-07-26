"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignModel = void 0;
const mongoose_1 = require("mongoose");
const CampaignSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    videoId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "VideoModel"
    },
    assetsId: [
        {
            a_id: {
                type: mongoose_1.Schema.Types.ObjectId, ref: "AssetsModel"
            }
        }
    ],
    campaignTitle: {
        type: String,
        required: "Must have campaign title"
    },
}, { timestamps: true });
exports.CampaignModel = mongoose_1.model("campaign", CampaignSchema);
//# sourceMappingURL=campaign.js.map