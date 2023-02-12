const express = require("express");
require("./DB/conexion");
const users = require("./Routers/usersRoute");
const data = require("./Routers/dataRoute");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(users);
app.use(data);

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});