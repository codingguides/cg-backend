// import { DealInfoModel } from "../models";
// import { Types } from 'mongoose';
// export class DealRepository {
//     async findById(dealId) {
//         const projection = "Trades Warranties ContractDate PaymentDate PaymentTerm PaymentTermMonths PaymentsPerYear Price DealType";
//         return DealInfoModel.findOne({ _id: new Types.ObjectId(dealId) }, projection).lean();
//     }
//     async getDeals(filter: any, sort: any, pagination: any): Promise<any[]> {
//         filter = { ...filter };
//         let pipelines: any[] = [{ $match: filter }];
//         pipelines.push({
//             $lookup: {
//                 from: 'grosses',
//                 localField: "Id",
//                 foreignField: "Id",
//                 as: "Gross"
//             }
//         });
//         pipelines.push({
//             $lookup: {
//                 from: 'bank_infos',
//                 localField: "Id",
//                 foreignField: "Id",
//                 as: "FinanceInfo"
//             }
//         });
//         pipelines.push({
//             $lookup: {
//                 from: 'lease_infos',
//                 localField: "Id",
//                 foreignField: "Id",
//                 as: "LeaseInfo"
//             }
//         });
//         pipelines.push({
//             $facet: {
//                 results: [
//                     {
//                         $sort: Object.keys(sort).length ? sort : { CreatedAt: -1 },
//                     },
//                     {
//                         $skip: ((pagination.page as number) - 1) * (pagination.limit as number),
//                     },
//                     {
//                         $limit: pagination.limit,
//                     },
//                 ],
//                 total: [
//                     {
//                         $count: "count",
//                     },
//                 ],
//             },
//         });
//         return DealInfoModel.aggregate(pipelines);
//     }
//     async getDealsForInnerContoller(query: any): Promise<any[]> {
//         const pipelines: any[] = [
//             {
//                 $match: { ...query }
//             },
//             {
//                 $lookup: {
//                     from: 'grosses',
//                     localField: "DealId",
//                     foreignField: "DealId",
//                     as: "Gross"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'bank_infos',
//                     localField: "DealId",
//                     foreignField: "DealId",
//                     as: "FinanceInfo"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: 'lease_infos',
//                     localField: "DealId",
//                     foreignField: "DealId",
//                     as: "LeaseInfo"
//                 }
//             }
//         ];
//         return DealInfoModel.aggregate(pipelines);
//     }
// }
//# sourceMappingURL=deal.js.map