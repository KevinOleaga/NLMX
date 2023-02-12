const express = require("express")
const Data = require("./../Models/data")
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// UPDATE 
router.put("/data/:id", function (req, res) {
    try {
        const _id = req.params.id;
        Data.findByIdAndUpdate(_id, req.body, { new: true }, function (err, result) {
            if (err) {
                console.log(" - [FAIL] DeleteData: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] UpdateData: El registro fue eliminado")
            } else {
                res.json({
                    status: "FAILED",
                })
                console.log(" - [FAIL] UpdateData: No fue posible eliminar el registro")
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] DeleteData: " + error)
    }
})

// DELETE ALL
router.get("/data/deleteAll", function (req, res) {
    try {
        Data.deleteMany(function (err, result) {
            if (err) {
                console.log(" - [FAIL] DeleteAll: " + err)
            }
            if (result) {
                res.json({
                    status: "SUCCESS"
                })
                console.log(" - [OK] DeleteAll: Se eliminaron todos los registros")
            } else {
                res.json({
                    status: "FAILED",
                })
                console.log(" - [FAIL] DeleteAll: No fue posible eliminar todos los registros")
            }
        })
    }
    catch (error) {
        console.log(" - [FAIL] DeleteAll: " + error)
    }
})

// Set storage engine 
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, 'Data' + path.extname(file.originalname));
    }
});

// Init upload 
const upload = multer({ storage: storage }).single('file');

// UPLOAD FILE
router.post('/data/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send({ msg: err });
        } else {
            if (req.file == undefined) {
                res.send({ msg: 'Error: No File Selected!' });
                console.log("Aqui no vamos :v")
            } else {
                console.log("Aqui vamos :v")
            }
        }

    });
    convertToJSON();
    saveData();
});


// CONVERT TO JSON
function convertToJSON() {
    xlsxToJson({
        input: './uploads/Data.xlsx', 
        output: './uploads/Data.json'
    }, function(err, result) {  
        if(err) {
            console.error(err);
        } else {
            console.log(result);
        }
    });
}

// SAVE DATA
function saveData() {
    // Read JSON file
    let rawdata = fs.readFileSync("./uploads/Data.json");
    let data = JSON.parse(rawdata);

    // Insert JSON into MongoDB 
    data.forEach(item => {
        let model = new Data(item);  // Create a model for each item in the JSON file 
        model.save();
    });
}

module.exports = router