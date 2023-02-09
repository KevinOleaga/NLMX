const mongoose = require("mongoose")
const DB = "mongodb://127.0.0.1:27017/Reto2"

mongoose.connect(DB).then(() => {
    console.log("Conexion exitosa!")
}).catch((e) => {
    console.log("Conexion fallida");
    console.log(e);
});