// import express from 'express';
const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors());
app.use(express.json({ extended: true }));//处理req
app.use(express.urlencoded({ extended:true}));//处理req

app.get("/", (req, res) => {
    res.send("API Running")
});
//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/shifts", require("./routes/api/shifts"));

app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/hospitals", require("./routes/api/hospitals"));
app.use("/api/jobs", require("./routes/api/shifts"));
app.use("/api/userTimetable", require("./routes/api/userTimetable"));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port${PORT}`));