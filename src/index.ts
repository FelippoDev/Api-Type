import express from "express";
import http from "http";
import bodyParser from "body-parser";
import CookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import authRouter from "./router";

const baseUrl: string = '/api/v1/'
const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression())
app.use(CookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(8080, () => {
    console.log("Server is running on http://127.0.0.1:8080/")
})

const MONGO_URL: string = 'mongodb://localhost:27017'

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))


app.use(baseUrl, authRouter())
const testRouter = express.Router();
testRouter.route("/").get(( request: express.Request, response: express.Response) => {
    return response.json({status: "success"})
})
app.use(baseUrl, testRouter)