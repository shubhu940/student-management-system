const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const studentRoutes = require("./routes/student.routes");
const marksRoutes = require("./routes/marks.routes");

const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management API Running"
  });
});

app.use("/api/students", studentRoutes);
app.use("/api/marks", marksRoutes);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;