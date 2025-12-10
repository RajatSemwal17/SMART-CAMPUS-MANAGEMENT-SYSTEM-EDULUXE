import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  role: String,
  attendance: Number,
  rollNo: Number,
  teacherId: Number,
  image: String,
  group: String,
  email: String,
  phone: String,
  department: String,
  address: String,
  FEE: String,
  JAVA: String,
  MCP: String,
  OS: String
});

export default mongoose.model("User", userSchema);
