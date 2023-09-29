import { TopicModel } from "../models";

export const getIdBySlug = async (slug) => {
    await TopicModel.findOne({"slug": slug}).then((val) => {
        console.log("getIdBySlug>>>>>>>>>>",val)
        if(val){
            return val
        }else{
            return {}
        }
    })
}