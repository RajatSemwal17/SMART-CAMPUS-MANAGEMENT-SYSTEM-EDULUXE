import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import User from "./models/User.js";  // ✅ Importing model correctly
// const User = require("./models/User"); 


dotenv.config();
console.log("🔍 Using MongoDB URL:", process.env.MONGO_URL);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/images", express.static("public/images"));  

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

  app.post("/api/registerUser", async (req, res) => {
    try {
        // Insert new user inside MongoDB
        const newUser = new User(req.body);
        await newUser.save();

        res.json({
            success: true,
            message: "User registered successfully!"
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.json({
            success: false,
            message: "Registration failed."
        });
    }
});


// ✅ Login Route
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });

    if (user) {
      res.json({
        success: true,
        message: "Login successful!",
        user: {
          username: user.username,
          name: user.name,
          role: user.role,
          attendance: user.attendance,
          rollNo: user.rollNo,
          teacherId: user.teacherId,
          image: user.image ? `http://localhost:5000/images/${user.image}` : null,
          group: user.group,
          email: user.email,
          phone: user.phone,
          department: user.department,
          address: user.address,
          FEE: user.FEE,
          JAVA: user.JAVA,
          MCP: user.MCP,
          OS: user.OS,
        }
      });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});


const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
