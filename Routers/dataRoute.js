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

    }
});

module.exports = router