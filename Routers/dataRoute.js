const express = require("express")
const Data = require("./../Models/data")
const fs = require('fs');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const xlsxToJson = require('xlsx-to-json');

// GET ALL DATA
router.get('/data', function (req, res) {
    try {
        Data.find(function (err, result) {
            if (err) {
                console.log(" - [FAIL] GetAllData: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS",
                    data: result
                })
                console.log(" - [OK] GetAllData: Los registros fueron encontrados")
            } else {
                res.json({
                    status: "FAILED",
                })
                console.log(" - [FAIL] GetAllData: Los registros NO fueron encontrados")
            }
        })
    } catch (error) {
        console.log(" - [FAIL] GetAllData: " + error)
    }
});

// UPDATE DATA
router.put("/data/:id", function (req, res) {
    try {
        const _id = req.params.id;
        Data.findByIdAndUpdate(_id, req.body, { new: true }, function (err, result) {
            if (err) {
                console.log(" - [FAIL] UpdateData: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] UpdateData: El registro fue actualizado")
            } else {
                res.json({
                    status: "FAILED",
                })
                console.log(" - [FAIL] UpdateData: No fue posible actualizar el registro")
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] UpdateData: " + error)
    }
})

// DELETE 
router.delete("/data/:id", function (req, res) {
    try {
        const _id = req.params.id;
        Data.findByIdAndDelete(_id, function (err, result) {
            if (err) {
                console.log(" - [FAIL] DeleteData: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] DeleteData: El registro fue eliminado")
            } else {
                res.json({
                    status: "FAILED",
                })
                console.log(" - [FAIL] DeleteData: No fue posible eliminar el registro")
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] DeleteData: " + error)
    }
})

// UPLOAD FILE
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, 'Data' + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('file');

router.post("/data/upload", function (req, res) {
    try {
        upload(req, res, (err) => {
            if (err) {
                console.log(" - [FAIL] UploadFile: " + err);
            }
            if (req.file == undefined) {
                res.json({
                    status: "FAILED"
                })
                console.log(" - [FAIL] UploadFile: No fue posible cargar el archivo")
            } else {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] UploadFile: El archivo fue cargado")
            }
        });
    }
    catch (error) {
        console.log(" - [FAIL] UploadFile: " + error)
    }
})

// DELETE ALL DATA
router.delete("/deleteAllData", function (req, res) {
    try {
        Data.deleteMany(function (err, result) {
            if (err) {
                console.log(" - [FAIL] DeleteAll: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] DeleteAll: Se eliminaron todos los registros");
            } else {
                res.json({
                    status: "FAILED"
                })
                console.log(" - [FAIL] DeleteAll: No fue posible eliminar todos los registros" + result)
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] DeleteAll: " + error)
    }
})

// CONVERT TO JSON
router.post("/data/convert", function (req, res) {
    try {
        xlsxToJson({
            input: './uploads/Data.xlsx',
            output: './uploads/Data.json'
        }, function (err, result) {
            if (err) {
                console.log(" - [FAIL] ConvertToJSON: " + err)
            }
            if (result) {
                console.log(" - [OK] ConvertToJSON: Archivo convertido a Data.json");
                res.json({
                    status: "SUCCESS"
                })
            } else {
                console.log(" - [FAIL] ConvertToJSON: No se logro convertir el Archivo formato .json");
                res.json({
                    status: "FAILED"
                })
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] ConvertToJSON: " + error)
    }
})

// SAVE DATA
const data = JSON.parse(fs.readFileSync('./uploads/Data.json', 'utf-8'))


// import data to MongoDB
const importData = async () => {
    try {
        await Data.create(data)
        console.log('data successfully imported')
        // to exit the process
        process.exit()
    } catch (error) {
        console.log('error', error)
    }
}

router.post("/data/saveData", function (req, res) {

    const importData = async () => {
        try {
            await Data.create(data)
            console.log('data successfully imported')
            // to exit the process
            process.exit()
        } catch (error) {
            console.log('error', error)
        }
    }
    importData() 
})

module.exports = router