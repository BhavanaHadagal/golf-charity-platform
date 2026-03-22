import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoute.js"
import charityRouter from "./routes/charityRoute.js"
import subscriptionRouter from "./routes/subscriptionRoute.js"
import scoreRouter from "./routes/scoreRoute.js"
import drawRouter from "./routes/drawRoute.js"
import winnerRouter from "./routes/winnerRoute.js"
import reportRouter from "./routes/reportRoute.js";

// App config 
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// api endpoints
app.use('/api/user', userRouter);
app.use("/api/charity", charityRouter);
app.use("/api/subscription", subscriptionRouter);
app.use("/api/score", scoreRouter);
app.use("/api/draw", drawRouter);
app.use("/api/winner", winnerRouter);
app.use("/api/report", reportRouter);

app.get('/', (req, res) => {
    res.send("API Working");
})

app.listen(port, ()=>{
    console.log('Server started on PORT : ' + port);
})