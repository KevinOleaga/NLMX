const mongoose = require("mongoose")
const DB = "mongodb://127.0.0.1:27017/Reto2"

mongoose.connect(DB).then(() => {
    console.log(" - [OK] DB: Conexion exitosa!")
}).catch((e) => {
    console.log(" - [OK] FAIL: Conexion fallida > " + e);
});