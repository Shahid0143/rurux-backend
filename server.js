const express = require("express");
const app = express();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const studentRoutes = require("./routes/studentRoutes");
require('dotenv').config()
const cors=require('cors')

// Connect to database
connectDB();

app.use(express.json());
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Backend working prefectly fine!!!")
})

app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);
app.use("/student", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
