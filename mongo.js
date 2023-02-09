// USERS CONFIG
const newSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const users = mongoose.model("users", newSchema)

module.exports = users

// DATA CONFIG
const dataSchema = new mongoose.Schema({
    CompanyID: {
        type: String,
        required: true
    },
    CompanyCode: {
        type: String,
        required: true
    },
    MonthDescription: {
        type: String,
        required: true
    },
    BusinessUnit: {
        type: String,
        required: true
    },
    EffectiveDate: {
        type: String,
        required: true
    },
    WeekNumberOfEffectiveDate: {
        type: String,
        required: true
    },
    Planned_Released: {
        type: String,
        required: true
    },
    FirmWO: {
        type: String,
        required: true
    },
    PlannedWO: {
        type: String,
        required: true
    },
    DailyCapacity: {
        type: String,
        required: true
    },
    WeeklyCapacity: {
        type: String,
        required: true
    },
    MonthlyCapacity: {
        type: String,
        required: true
    },
    RequestDate: {
        type: String,
        required: true
    },
    Rate_Hour: {
        type: String,
        required: true
    },
    PrimaryUOM_Hour: {
        type: String,
        required: true
    },
    ShortItemNumber: {
        type: String,
        required: true
    },
    ItemDescription: {
        type: String,
        required: true
    },
    WorkOrderQuantity: {
        type: String,
        required: true
    },
    QuantityOrdered: {
        type: String,
        required: true
    },
    WorkOrderNo: {
        type: String,
        required: true
    },
    WOStatus: {
        type: String,
        required: true
    },
    TypeOfRouting: {
        type: String,
        required: true
    },
    WorkOrderQuantity: {
        type: String,
        required: true
    }
})

const data = new mongoose.model('data', dataSchema);

module.exports = data;