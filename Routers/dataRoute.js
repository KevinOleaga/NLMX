const express = require("express")
const Data = require("./../Models/data")
const router = express.Router();

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

module.exports = router