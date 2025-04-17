const express = require("express");
const dbConnect = require("./db/db");
const app = express();
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");

const errorHandler = require("./middleware/errorHandler");
const fileUpload = require("express-fileupload");
const cors = require("cors");


app.use(cors());



dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/task", taskRouter);

app.use(errorHandler);

module.exports = app;
