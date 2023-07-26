// import { CronJob, } from "cron";
// import { HttpHelper } from "@401_digital/xrm-core";
// import moment from "moment";
// import { EnvConfig } from "../configs";
// import { SchedulerCycleRepository } from "../repositories";
// import { PBSServiceType, LogType } from "../constants";
// import {
//     SchedulerLogsModel,
//     DealInfoModel,
//     BankInfoModel,
//     GrossModel,
//     LeaseInfoModel,
//     DealHistoryModel
// } from "../models";
// import { SchedulerLogsEntity, DealEntity } from "../entities";
// const schedulerCycleRepo = new SchedulerCycleRepository();
// const { pbs } = EnvConfig.thirdParty;
// function SchedulerLogger(data: SchedulerLogsEntity) {
//     if (data.status == LogType.ERROR) {
//         SchedulerLogsModel.create(data).catch(error => {
//             console.error(error);
//         });
//     }
// }
// async function DealReader() {
//     const serials = (await schedulerCycleRepo.getByServiceType(PBSServiceType.DealGet)).map(cycle => cycle.serialNumber);
//     const http = new HttpHelper(EnvConfig.thirdParty.pbs.host);
//     const promises = [];
//     const commands = [];
//     const logger = new SchedulerLogsEntity();
//     logger.serviceType = PBSServiceType.DealGet;
//     serials.forEach((serialNumber) => {
//         logger.serialNumber = serialNumber;
//         logger.startTime = new Date();
//         const promise = new Promise((resolve) => {
//             schedulerCycleRepo
//                 .getCycle(serialNumber, PBSServiceType.DealGet)
//                 .then(async (sc) => {
//                     const currentUtcDate = moment.utc(new Date()).toDate();
//                     const ModifiedSince = moment.utc(sc.lastCycle).toDate();
//                     let ModifiedUntil = moment.utc(sc.lastCycle).add(sc.duration, sc.durationUnit as any).toDate();
//                     if (ModifiedUntil > currentUtcDate) {
//                         ModifiedUntil = currentUtcDate
//                     }
//                     logger.from = ModifiedSince;
//                     logger.to = ModifiedUntil;
//                     const payload = {
//                         SerialNumber: serialNumber,
//                         ModifiedSince,
//                         ModifiedUntil
//                     };
//                     const filter = { serialNumber: serialNumber, serviceType: PBSServiceType.DealGet };
//                     const authorization = { Authorization: `Basic ${Buffer.from(pbs.username + ':' + pbs.password).toString('base64')}` };
//                     if (ModifiedSince <= currentUtcDate) {
//                         console.log(`Reading Data from ${ModifiedSince} to ${ModifiedUntil}`);
//                         http
//                             .post(pbs.paths.dealGet, payload, authorization)
//                             .then(async (result) => {
//                                 console.log(`Got Result from PBS which is type of ${typeof result['Deals']}`);
//                                 commands.push({
//                                     filter: filter,
//                                     updatePayload: { lastCycle: ModifiedUntil },
//                                 });
//                                 resolve(
//                                     (result["Deals"]).map(
//                                         (deal: any) => {
//                                             if (!deal.SerialNumber)
//                                                 deal.SerialNumber = serialNumber;
//                                             return deal;
//                                         },
//                                     ),
//                                 );
//                             })
//                             .catch(async (error) => {
//                                 console.error(error);
//                                 logger.error = error.message;
//                                 logger.pbsReadTime = new Date();
//                                 logger.endTime = new Date();
//                                 logger.status = LogType.ERROR;
//                                 SchedulerLogger(logger);
//                                 resolve([]);
//                             });
//                     } else {
//                         commands.push({
//                             filter: filter,
//                             updatePayload: { lastCycle: moment.utc(new Date()).toDate().setHours(0, 0, 0, 0) },
//                         });
//                         resolve([]);
//                     }
//                 });
//         });
//         promises.push(promise);
//     });
//     const records = (await Promise.all(promises)).reduce((a, b) => a.concat(b), []);
//     BulkDealProcessor(records, commands, logger);
// }
// async function BulkDealProcessor(Deals: Array<DealEntity>, commands: any[], logger: SchedulerLogsEntity) {
//     try {
//         if (Deals && Array.isArray(Deals) && Deals.length) {
//             const chunkSize = 500;
//             let chunk = chunkSize, index = 0;
//             const length = Deals.length;
//             while (index <= length) {
//                 const DealsInfo = Deals.slice(index, chunk);
//                 console.info("Processing Chunk From : ", index, "To : ", chunk);
//                 if (DealsInfo.length) {
//                     let serialChange = false;
//                     let bulkOpsForDeal = DealInfoModel.collection.initializeUnorderedBulkOp();
//                     let bulkOpsForDealHistory = DealHistoryModel.collection.initializeUnorderedBulkOp();
//                     let bulkOpsForGross = GrossModel.collection.initializeUnorderedBulkOp();
//                     let bulkOpsForLeaseInfo = LeaseInfoModel.collection.initializeUnorderedBulkOp();
//                     let bulkOpsForFinanceinfo = BankInfoModel.collection.initializeUnorderedBulkOp();
//                     for (let record of DealsInfo) {
//                         const { FinanceInfo, Gross, LeaseInfo, DealId, ...rest } = record;
//                         bulkOpsForDeal.find({ DealId }).upsert().updateOne({ $set: { UpdatedAt: new Date(), ...rest }, $setOnInsert: { DealId: DealId, CreatedAt: new Date() }});
//                         bulkOpsForGross.find({ DealId }).upsert().updateOne({ $set: { ...Gross, UpdatedAt: new Date(),},$setOnInsert: { DealId: DealId, CreatedAt: new Date() }});
//                         bulkOpsForLeaseInfo.find({ DealId }).upsert().updateOne({ $set: { ...LeaseInfo, UpdatedAt: new Date(), }, $setOnInsert: { DealId: DealId, CreatedAt: new Date() }});
//                         bulkOpsForFinanceinfo.find({ DealId }).upsert().updateOne({ $set: { ...FinanceInfo, UpdatedAt: new Date(), }, $setOnInsert: { DealId: DealId, CreatedAt: new Date() }});
//                         // let CurrentDeal = DealsInfo.find((deal: any) => deal.DealId === DealId);
//                         // if (CurrentDeal && parseInt(CurrentDeal["SerialNumber"], 10) !== parseInt(record.SerialNumber, 10)) {
//                         //     serialChange = true
//                         //     bulkOpsForDealHistory.insert({
//                         //         DealId: record.DealId,
//                         //         previousSerialNumber: CurrentDeal["SerialNumber"],
//                         //         newSerialNumber: record.SerialNumber,
//                         //         lastUpdate: new Date(record.LastUpdate)
//                         //     })
//                         // }
//                     }
//                     const promises = [ bulkOpsForDeal.execute(), bulkOpsForGross.execute(), bulkOpsForLeaseInfo.execute(), bulkOpsForFinanceinfo.execute()]
//                     if (serialChange) promises.push(bulkOpsForDealHistory.execute());
//                     await Promise.all(promises);
//                 }
//                 index = chunk;
//                 chunk = chunk + chunkSize;
//             }
//             logger.endTime = new Date();
//             await Promise.all([schedulerCycleRepo.updateCycles(commands), SchedulerLogger(logger)]);
//         }
//     } catch (error) {
//         console.error('error : ', error);
//         logger.endTime = new Date();
//         logger.status = LogType.ERROR;
//         logger.error = error.message;
//         await SchedulerLogger(logger);
//     }
// }
// export function DealScheduler() {
//     const pbsJob = new CronJob(pbs.cronOrder, () => {
//         DealReader();
//     }, () => {
//         console.log("Cron Stop Event")
//     })
//     pbsJob.start();
// }
//# sourceMappingURL=pbs-deals.js.map