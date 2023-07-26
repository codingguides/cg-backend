"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XlsxController = void 0;
const express_1 = require("express");
const models_1 = require("../models");
var moment = require('moment');
//////////////////////////////////////////////////////////////
const excel = require('exceljs');
//////////////////////////////////////////////////////////////
exports.XlsxController = express_1.Router();
//
exports.XlsxController.get('/download/:userId/:year/:month', async (request, response, next) => {
    try {
        const { month, year, userId } = request.params;
        // let userId = "61b339e7fe5b6b48515f689a"
        console.clear();
        // Create workbook & add worksheet
        let workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('ExampleSheet');
        const startOfMonth = moment(`${year}-${month}-01`).clone().startOf('month').format('YYYY-MM-DD HH:mm:ss');
        const endOfMonth = moment(`${year}-${month}-30`).clone().endOf('month').format('YYYY-MM-DD HH:mm:ss');
        console.log(startOfMonth, ">>>>>>>>>>>>>><<<<<<<<<<<<<<", endOfMonth);
        // add column headers
        worksheet.columns = [
            { header: 'Current Date', key: 'CurrentDate', width: 30 },
            { header: 'Invoiced User', key: 'InvoicedUser', width: 30 },
            { header: 'Booked By User', key: 'BookedByUser', width: 30 },
            { header: 'Booking Created Date', key: 'BookingCreatedDate', width: 30 },
            { header: 'Received By User', key: 'ReceivedByUser', width: 30 },
            { header: 'Explained User', key: 'ExplainedUser', width: 30 },
            { header: 'Invoice Number', key: 'InvoiceNumber', width: 30 },
            { header: 'Job Number', key: 'JobNumber', width: 30 },
            { header: 'Customer', key: 'Customer', width: 30 },
            { header: 'Account Number', key: 'AccountNumber', width: 30 },
            { header: 'Customer Type', key: 'CustomerType', width: 30 },
            { header: 'Labour', key: 'Labour', width: 30 },
            { header: 'Hours Sold', key: 'HoursSold', width: 30 },
            { header: 'Hours Awarded', key: 'HoursAwarded', width: 30 },
            { header: 'Hours Worked', key: 'HoursWorked', width: 30 },
            { header: 'Parts', key: 'Parts', width: 30 },
            { header: 'Ext Warranty', key: 'ExtWarranty', width: 30 },
            { header: 'Jag Collection And Delivery Charges', key: 'JagCollectionAndDeliveryCharges', width: 30 },
            { header: 'Jag Consumable Sales', key: 'JagConsumableSales', width: 30 },
            { header: 'Jag Customer Assistance Programme', key: 'JagCustomerAssistanceProgramme', width: 30 },
            { header: 'JagEnvironmentalCharges', key: 'JagEnvironmentalCharges', width: 30 },
            { header: 'JagExtWarranty', key: 'JagExtWarranty', width: 30 },
            { header: 'JagFuel', key: 'JagFuel', width: 30 },
            { header: 'JagInsuranceAdminFee', key: 'JagInsuranceAdminFee', width: 30 },
            { header: 'JagLoanCarCharges', key: 'JagLoanCarCharges', width: 30 },
            { header: 'JagMOTCertification', key: 'JagMOTCertification', width: 30 },
            { header: 'JagParkingFine', key: 'JagParkingFine', width: 30 },
            { header: 'JagSmartRepairsDents', key: 'JagSmartRepairsDents', width: 30 },
            { header: 'JagSmartRepairsInterior', key: 'JagSmartRepairsInterior', width: 30 },
            { header: 'JagSmartRepairsPaint', key: 'JagSmartRepairsPaint', width: 30 },
            { header: 'JagSmartRepairsWheels', key: 'JagSmartRepairsWheels', width: 30 },
            { header: 'JagSubContract', key: 'JagSubContract', width: 30 },
            { header: 'JagSubContractMOT', key: 'JagSubContractMOT', width: 30 },
            { header: 'JagSundries', key: 'JagSundries', width: 30 },
            { header: 'JagValeting', key: 'JagValeting', width: 30 },
            { header: 'JagWindscreenRepairs', key: 'JagWindscreenRepairs', width: 30 },
            { header: 'LRCD', key: 'LRCD', width: 30 },
            { header: 'LRCollectionDeliveryCharges', key: 'LRCollectionDeliveryCharges', width: 30 },
            { header: 'LRConsumableSales', key: 'LRConsumableSales', width: 30 },
            { header: 'LRCustomerAssistanceProgramme', key: 'LRCustomerAssistanceProgramme', width: 30 },
            { header: 'LREnvironmentalCharges', key: 'LREnvironmentalCharges', width: 30 },
            { header: 'LRFuel', key: 'LRFuel', width: 30 },
            { header: 'LRFuelCourtesyCar', key: 'LRFuelCourtesyCar', width: 30 },
            { header: 'LRInsuranceAdminFee', key: 'LRInsuranceAdminFee', width: 30 },
            { header: 'LRInsuranceWaiverFee', key: 'LRInsuranceWaiverFee', width: 30 },
            { header: 'LRLoanCarCharges', key: 'LRLoanCarCharges', width: 30 },
            { header: 'LRMOTCertification', key: 'LRMOTCertification', width: 30 },
            { header: 'LROilTopup', key: 'LROilTopup', width: 30 },
            { header: 'LRParkingFine', key: 'LRParkingFine', width: 30 },
            { header: 'LRPreMOT', key: 'LRPreMOT', width: 30 },
            { header: 'LRSubContractMOT', key: 'LRSubContractMOT', width: 30 },
            { header: 'LRSundries', key: 'LRSundries', width: 30 },
            { header: 'LRValeting', key: 'LRValeting', width: 30 },
            { header: 'LRWarrantyExcess', key: 'LRWarrantyExcess', width: 30 },
            { header: 'SmartRepairsDents', key: 'SmartRepairsDents', width: 30 },
            { header: 'SmartRepairsInterior', key: 'SmartRepairsInterior', width: 30 },
            { header: 'SmartRepairsPaint', key: 'SmartRepairsPaint', width: 30 },
            { header: 'SmartRepairsWheels', key: 'SmartRepairsWheels', width: 30 },
            { header: 'SubContract', key: 'SubContract', width: 30 },
            { header: 'WindscreenRepairs', key: 'WindscreenRepairs', width: 30 },
            { header: 'MOTValue', key: 'MOTValue', width: 30 },
            { header: 'TotalSales', key: 'TotalSales', width: 30 },
            { header: 'PartsCOS', key: 'PartsCOS', width: 30 },
            { header: 'LabourCOS', key: 'LabourCOS', width: 30 },
            { header: 'SubCOS', key: 'SubCOS', width: 30 },
            { header: 'TotalCost', key: 'TotalCost', width: 30 },
            { header: 'WorkshopWriteOff', key: 'WorkshopWriteOff', width: 30 },
            { header: 'PartsWriteOff', key: 'PartsWriteOff', width: 30 },
            { header: 'Profit', key: 'Profit', width: 30 },
            { header: 'RegistrationNo', key: 'RegistrationNo', width: 30 },
            { header: 'VIN', key: 'VIN', width: 30 },
            { header: 'ServiceTeam', key: 'ServiceTeam', width: 30 },
            { header: 'WorkRequiredNotes', key: 'WorkRequiredNotes', width: 30 },
            { header: 'PartsAwaitedDate', key: 'PartsAwaitedDate', width: 30 },
            { header: 'PartsAwaitedNotes', key: 'PartsAwaitedNotes', width: 30 },
            { header: 'CSIFollowUpDate', key: 'CSIFollowUpDate', width: 30 },
            { header: 'CSIFollowUpNotes', key: 'CSIFollowUpNotes', width: 30 },
            { header: 'LabourType', key: 'LabourType', width: 30 },
            { header: 'MOT', key: 'MOT', width: 30 },
            { header: 'Service', key: 'Service', width: 30 },
            { header: 'Make', key: 'Make', width: 30 },
            { header: 'Model', key: 'Model', width: 30 },
            { header: 'Specification', key: 'Specification', width: 30 },
            { header: 'RegistrationDate', key: 'RegistrationDate', width: 30 },
            { header: 'InvoiceType', key: 'InvoiceType', width: 30 },
            { header: 'VehicleArrivalDate', key: 'VehicleArrivalDate', width: 30 },
            { header: 'Mileage', key: 'Mileage', width: 30 },
            { header: 'VHC', key: 'VHC', width: 30 }
        ];
        models_1.BIModel
            .find({
            "userId": userId,
            "CurrentDate": {
                $gte: startOfMonth,
                $lt: endOfMonth
            }
        })
            .sort({ CurrentDate: 1 })
            .then((val) => {
            if (val) {
                let addCol = [];
                val.map((item) => {
                    let date = new Date(item['CurrentDate']);
                    if (date.getUTCMonth() + 1 == parseInt(month) && date.getFullYear() == parseInt(year)) {
                        worksheet.addRow({
                            CurrentDate: item['CurrentDate'],
                            InvoicedUser: item['InvoicedUser'],
                            BookedByUser: item['BookedByUser'],
                            BookingCreatedDate: item['BookingCreatedDate'],
                            ReceivedByUser: item['ReceivedByUser'],
                            ExplainedUser: item['ExplainedUser'],
                            InvoiceNumber: item['InvoiceNumber'],
                            JobNumber: item['JobNumber'],
                            Customer: item['Customer'],
                            AccountNumber: item['AccountNumber'],
                            CustomerType: item['CustomerType'],
                            Labour: item['Labour'],
                            HoursSold: item['HoursSold'],
                            HoursAwarded: item['HoursAwarded'],
                            HoursWorked: item['HoursWorked'],
                            Parts: item['Parts'],
                            ExtWarranty: item['ExtWarranty'],
                            JagCollectionAndDeliveryCharges: item['JagCollectionAndDeliveryCharges'],
                            JagConsumableSales: item['JagConsumableSales'],
                            JagCustomerAssistanceProgramme: item['JagCustomerAssistanceProgramme'],
                            JagEnvironmentalCharges: item['JagEnvironmentalCharges'],
                            JagExtWarranty: item['JagExtWarranty'],
                            JagFuel: item['JagFuel'],
                            JagInsuranceAdminFee: item['JagInsuranceAdminFee'],
                            JagLoanCarCharges: item['JagLoanCarCharges'],
                            JagMOTCertification: item['JagMOTCertification'],
                            JagParkingFine: item['JagParkingFine'],
                            JagSmartRepairsDents: item['JagSmartRepairsDents'],
                            JagSmartRepairsInterior: item['JagSmartRepairsInterior'],
                            JagSmartRepairsPaint: item['JagSmartRepairsPaint'],
                            JagSmartRepairsWheels: item['JagSmartRepairsWheels'],
                            JagSubContract: item['JagSubContract'],
                            JagSubContractMOT: item['JagSubContractMOT'],
                            JagSundries: item['JagSundries'],
                            JagValeting: item['JagValeting'],
                            JagWindscreenRepairs: item['JagWindscreenRepairs'],
                            LRCD: item['LRCD'],
                            LRCollectionDeliveryCharges: item['LRCollectionDeliveryCharges'],
                            LRConsumableSales: item['LRConsumableSales'],
                            LRCustomerAssistanceProgramme: item['LRCustomerAssistanceProgramme'],
                            LREnvironmentalCharges: item['LREnvironmentalCharges'],
                            LRFuel: item['LRFuel'],
                            LRFuelCourtesyCar: item['LRFuelCourtesyCar'],
                            LRInsuranceAdminFee: item['LRInsuranceAdminFee'],
                            LRInsuranceWaiverFee: item['LRInsuranceWaiverFee'],
                            LRLoanCarCharges: item['LRLoanCarCharges'],
                            LRMOTCertification: item['LRMOTCertification'],
                            LROilTopup: item['LROilTopup'],
                            LRParkingFine: item['LRParkingFine'],
                            LRPreMOT: item['LRPreMOT'],
                            LRSubContractMOT: item['LRSubContractMOT'],
                            LRSundries: item['LRSundries'],
                            LRValeting: item['LRValeting'],
                            LRWarrantyExcess: item['LRWarrantyExcess'],
                            SmartRepairsDents: item['SmartRepairsDents'],
                            SmartRepairsInterior: item['SmartRepairsInterior'],
                            SmartRepairsPaint: item['SmartRepairsPaint'],
                            SmartRepairsWheels: item['SmartRepairsWheels'],
                            SubContract: item['SubContract'],
                            WindscreenRepairs: item['WindscreenRepairs'],
                            MOTValue: item['MOTValue'],
                            TotalSales: item['TotalSales'],
                            PartsCOS: item['PartsCOS'],
                            LabourCOS: item['LabourCOS'],
                            SubCOS: item['SubCOS'],
                            TotalCost: item['TotalCost'],
                            WorkshopWriteOff: item['WorkshopWriteOff'],
                            PartsWriteOff: item['PartsWriteOff'],
                            Profit: item['Profit'],
                            RegistrationNo: item['RegistrationNo'],
                            VIN: item['VIN'],
                            ServiceTeam: item['ServiceTeam'],
                            WorkRequiredNotes: item['WorkRequiredNotes'],
                            PartsAwaitedDate: item['PartsAwaitedDate'],
                            PartsAwaitedNotes: item['PartsAwaitedNotes'],
                            CSIFollowUpDate: item['CSIFollowUpDate'],
                            CSIFollowUpNotes: item['CSIFollowUpNotes'],
                            LabourType: item['LabourType'],
                            MOT: item['MOT'],
                            Service: item['Service'],
                            Make: item['Make'],
                            Model: item['Model'],
                            Specification: item['Specification'],
                            RegistrationDate: item['RegistrationDate'],
                            InvoiceType: item['InvoiceType'],
                            VehicleArrivalDate: item['VehicleArrivalDate'],
                            Mileage: item['Mileage'],
                            VHC: item['VHC']
                        });
                    }
                });
                console.log("addCol>>>>>>>>>>>", addCol);
                workbook
                    .xlsx
                    .writeFile(`uploads/data-${userId}.xlsx`)
                    .then(() => {
                    console.log("saved");
                    const file = `uploads/data-${userId}.xlsx`;
                    response.download(file);
                })
                    .catch((err) => {
                    console.log("err", err);
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
//# sourceMappingURL=xlsx.js.map