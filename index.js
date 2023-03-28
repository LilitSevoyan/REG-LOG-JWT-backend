const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")


app.use(express.json())
app.use(cors())

const Router = require("./routes/users")

const CONNECTION_URL = process.env.MONGOOSE_CONNECTION_URL

app.use("/", Router)

mongoose.connect(
    CONNECTION_URL,
     { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log(err );
        }else{
            console.log("Mongoose is Working!");
        }
    }
 )



 app.listen(8080, () => console.log("server is started"))
