const data_ = require("./mongo")
const express = require("express")
const collection = require("./mongo")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req, res) => {

})

// LOGIN
app.post("/", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await collection.findOne({ email: email, password: password })

        if (check) {
            res.json("exist")
        } else {
            res.json("not exist")
        }
    } catch {
        res.json("not exist")
    }
})

// CREATE USER
app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    try {
        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("exist")
        } else {
            res.json("not exist")
            await collection.insertMany([data])
        }
    } catch {
        res.json("not exist")
    }
})

//GET ALL RECORDS 
app.get("/data", async (req, res) => {
    try {
        const result = await data_.find()
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Not found record"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "Records found",
                data: result
            })
        }
    }
    catch (e) {
        console.log(e)
    }
})

// UPDATE RECORDS 
app.put("/data/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await data_.findByIdAndUpdate(_id, req.body, { new: true });
        console.log(result)
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Error: El registro no pudo ser actualizado correctamente",
                data: result
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "El registro se actualizo correctamente...",
                data: result
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})
// Delete Records 
app.delete("/data/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const result = await data_.findByIdAndDelete(_id);
        if (!result) {
            res.json({
                status: "FAILED",
                message: "Error: El registro no pudo ser eliminado"
            })
        }
        else {
            res.json({
                status: "SUCCESS",
                message: "El registro fue eliminado correctamente"
            })
        }
    }
    catch (e) {
        res.send(e)
    }
})

app.listen(8000, () => {
    console.log("port connected");
})