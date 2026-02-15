const express = require("express");
const supabase = require("../supabaseClient");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get tasks
router.get("/", protect, async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json(error);

  res.json(data);
});

// Add task
router.post("/", protect, async (req, res) => {
  const { title } = req.body;

  const { data, error } = await supabase.from("tasks").insert([
    {
      title,
      completed: false,
      user_id: req.user.id,
    },
  ]);

  if (error) return res.status(400).json(error);

  res.json(data);
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", req.params.id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Deleted" });
});

module.exports = router;
