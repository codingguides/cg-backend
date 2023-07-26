"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BIModel = void 0;
const mongoose_1 = require("mongoose");
const BiSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel"
    },
    CurrentDate: {
        type: Date,
    },
    InvoicedUser: {
        type: String,
    },
    BookedByUser: {
        type: String,
    },
    BookingCreatedDate: {
        type: Date,
    },
    ReceivedByUser: {
        type: String,
    },
    ExplainedUser: {
        type: String,
    },
    InvoiceNumber: {
        type: Number,
    },
    JobNumber: {
        type: Number,
    },
    Customer: {
        type: String,
    },
    AccountNumber: {
        type: String,
    },
    CustomerType: {
        type: String,
    },
    Labour: {
        type: String,
    },
    HoursSold: {
        type: String,
    },
    HoursAwarded: {
        type: String,
    },
    HoursWorked: {
        type: String,
    },
    Parts: {
        type: String,
    },
    ExtWarranty: {
        type: String,
    },
    JagCollectionAndDeliveryCharges: {
        type: String,
    },
    JagConsumableSales: {
        type: String,
    },
    JagCustomerAssistanceProgramme: {
        type: String,
    },
    JagEnvironmentalCharges: {
        type: String,
    },
    JagExtWarranty: {
        type: String,
    },
    JagFuel: {
        type: String,
    },
    JagInsuranceAdminFee: {
        type: String,
    },
    JagLoanCarCharges: {
        type: String,
    },
    JagMOTCertification: {
        type: String,
    },
    JagParkingFine: {
        type: String,
    },
    JagSmartRepairsDents: {
        type: String,
    },
    JagSmartRepairsInterior: {
        type: String,
    },
    JagSmartRepairsPaint: {
        type: String,
    },
    JagSmartRepairsWheels: {
        type: String,
    },
    JagSubContract: {
        type: String,
    },
    JagSubContractMOT: {
        type: String,
    },
    JagSundries: {
        type: String,
    },
    JagValeting: {
        type: String,
    },
    JagWindscreenRepairs: {
        type: String,
    },
    LRCD: {
        type: String,
    },
    LRCollectionDeliveryCharges: {
        type: String,
    },
    LRConsumableSales: {
        type: String,
    },
    LRCustomerAssistanceProgramme: {
        type: String,
    },
    LREnvironmentalCharges: {
        type: String,
    },
    LRFuel: {
        type: String,
    },
    LRFuelCourtesyCar: {
        type: String,
    },
    LRInsuranceAdminFee: {
        type: String,
    },
    LRInsuranceWaiverFee: {
        type: String,
    },
    LRLoanCarCharges: {
        type: String,
    },
    LRMOTCertification: {
        type: String,
    },
    LROilTopup: {
        type: String,
    },
    LRParkingFine: {
        type: String,
    },
    LRPreMOT: {
        type: String,
    },
    LRSubContractMOT: {
        type: String,
    },
    LRSundries: {
        type: String,
    },
    LRValeting: {
        type: String,
    },
    LRWarrantyExcess: {
        type: String,
    },
    SmartRepairsDents: {
        type: String,
    },
    SmartRepairsInterior: {
        type: String,
    },
    SmartRepairsPaint: {
        type: String,
    },
    SmartRepairsWheels: {
        type: String,
    },
    SubContract: {
        type: String,
    },
    WindscreenRepairs: {
        type: String,
    },
    MOTValue: {
        type: String,
    },
    TotalSales: {
        type: String,
    },
    PartsCOS: {
        type: String,
    },
    LabourCOS: {
        type: String,
    },
    SubCOS: {
        type: String,
    },
    TotalCost: {
        type: String,
    },
    WorkshopWriteOff: {
        type: String,
    },
    PartsWriteOff: {
        type: String,
    },
    Profit: {
        type: String,
    },
    RegistrationNo: {
        type: String,
    },
    VIN: {
        type: String,
    },
    ServiceTeam: {
        type: String,
    },
    WorkRequiredNotes: {
        type: String,
    },
    PartsAwaitedDate: {
        type: String,
    },
    PartsAwaitedNotes: {
        type: String,
    },
    CSIFollowUpDate: {
        type: String,
    },
    CSIFollowUpNotes: {
        type: String,
    },
    LabourType: {
        type: String,
    },
    MOT: {
        type: String,
    },
    Service: {
        type: String,
    },
    Make: {
        type: String,
    },
    Model: {
        type: String,
    },
    Specification: {
        type: String,
    },
    RegistrationDate: {
        type: String,
    },
    InvoiceType: {
        type: String,
    },
    VehicleArrivalDate: {
        type: String,
    },
    Mileage: {
        type: Number,
    },
    VHC: {
        type: String,
    },
    isDefult: {
        type: Boolean,
        default: false
    },
    uniqueId: {
        type: String,
    }
}, { timestamps: true });
exports.BIModel = mongoose_1.model("bidata", BiSchema);
//# sourceMappingURL=bidata.js.map