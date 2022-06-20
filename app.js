const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

//security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

app.use(express.json());

app.use(
  cors({
    origin: "https://glowing-queijadas-f60c6f.netlify.app",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(xss());

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const homeRouter = require("./routes/home");

const connectDB = require("./db/connect");
const authCheck = require("./middlewares/auth");
const errorHandlerMiddleware = require("./middlewares/error-handlers");
const notFound = require("./middlewares/not-found");

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/auth", authRouter);
app.use("/dashboard", authCheck, postRouter);
app.use("/home", homeRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = () => {
  try {
    app.listen(port, async () => {
      await connectDB(process.env.MONGO_URI);
      console.log("SERVER IS LISTENING...");
    });
  } catch (error) {
    console.log(error);
  }
};
start();
