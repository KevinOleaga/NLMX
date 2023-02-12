const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({
    CompanyCode: { type: String },
    MonthDescription: { type: String },
    BusinessUnit: { type: String },
    EffectiveDate: { type: String },
    WeekNumberOfEffectiveDate: { type: String },
    Planned_Released: { type: String },
    FirmWO: { type: String },
    PlannedWO: { type: String },
    DailyCapacity: { type: String },
    WeeklyCapacity: { type: String },
    MonthlyCapacity: { type: String },
    RequestDate: { type: String },
    Rate_Hour: { type: String },
    PrimaryUOM_Hour: { type: String },
    ShortItemNumber: { type: String },
    ItemDescription: { type: String },
    WorkOrderQuantity: { type: String },
    QuantityOrdered: { type: String },
    WorkOrderNo: { type: String },
    WOStatus: { type: String },
    TypeOfRouting: { type: String },
    WorkOrderQuantity: { type: String }
})

const data = mongoose.model("data", dataSchema)

module.exports = data;