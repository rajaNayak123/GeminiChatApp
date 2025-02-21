import { connectToDb } from "./database/db.js";
import { app } from "./app.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})

connectToDb().then(()=>{
    app.listen(process.env.PORT||8000, ()=>{
        console.log(`Server listening on port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("server connection error: " + error);
})
