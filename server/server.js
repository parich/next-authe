import express from "express";
import cors from 'cors';
import fs from 'fs';
import mongoose from "mongoose";
require("dotenv").config();
const morgan = require("morgan");

//create express app
const app = express();

//db
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
    //useCreateIndex: true
}).then(() => console.log('DB CONNECTED'))
    .catch((err) => console.log('DB CONNECT ERROR', err));

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//route
fs.readdirSync("./routes").map((r) =>
    app.use("/api", require(`./routes/${r}`))
);

//port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`server is runing on port ${port}`));