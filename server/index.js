import express from "express";
import { initConnection } from "./db/connection.js";
import userRoutes from "./modules/user/user.routes.js";
import "dotenv/config.js";
const app = express();
const port = 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.json());

// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(express.urlencoded({ extended: false }));

// parse incoming Request Object if object, with nested objects, or generally any type.
//app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

//Start a connection to DB
initConnection();
