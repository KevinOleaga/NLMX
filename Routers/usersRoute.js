const express = require("express")
const Login = require("./../Models/users")
const router = express.Router();

// LOGIN
router.post('/login', function (req, res) {
    Login.findOne({ email: req.body.email, password: req.body.password }, function (err, result) {
        if (err) {
            console.log(" - [FAIL] LOGIN: " + err)
        }
        if (result) {
            res.json("exist")
            console.log(" - [OK] LOGIN: Credenciales correctas > Usuario " + req.body.email + " / Contraseña: " + req.body.password)
        } else {
            res.json("not exist")
            console.log(" - [FAIL] LOGIN: Credenciales incorrectas > Usuario " + req.body.email + " / Contraseña: " + req.body.password)
        }
    })
});

// CREATE USER
router.post('/signup', function (req, res) {
    const { email, password } = req.body
    const data = {
        email: email,
        password: password
    }

    Login.findOne({ email: req.body.email }, function (err, result) {
        if (err) {
            console.log(" - [FAIL] SIGN UP: " + err)
        }
        if (result) {
            res.json("exist")
            console.log(" - [FAIL] SIGN UP: El usuario " + req.body.email + " ya se encuentra en la BD")
        } else {
            res.json("not exist")
            Login.insertMany([data])
            console.log(" - [OK] SIGN UP: El usuario " + req.body.email + " fue creado en la BD")
        }
    })
});

module.exports = router