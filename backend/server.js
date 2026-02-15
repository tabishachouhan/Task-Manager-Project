const express = require("express");
const cors = require("cors");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);




const supabase = require("./supabaseClient");

// Test Supabase connection when server starts
(async () => {
  console.log("🔄 Checking Supabase connection...");

  const { data, error } = await supabase.from("tasks").select("*");

  if (error) {
    console.error("❌ Supabase NOT connected");
    console.error("Error:", error.message);
  } else {
    console.log("✅ Supabase Connected Successfully");
  }
})();

app.listen(5000, () => console.log("Server running on port 5000"));
