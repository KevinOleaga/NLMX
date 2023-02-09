const express = require("express");
require("./DB/conexion");
const users = require("./Routers/usersRoute");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");

//Insert data in user collection and getting from API and
app.use(express.json());
// 3: we need to register our router 
app.use(cors());
app.use(users);

app.listen(port, () => {
    console.log(`connection is setup at ${port}`);
});