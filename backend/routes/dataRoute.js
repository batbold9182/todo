const { Router } = require("express");
const Data = require("../db/data");
const middleware = require("../middleware");

const router = Router();

router.get("/", middleware, async (req, res) => {
  try {
    const allItem = await Data.find({ userId: req.user.id });
    res.json({ message: "all data", data: allItem });
  } catch (err) {
    res.status(500).json({ message: "error fetching data", error: err.message });
  }
});

router.post("/", middleware, async (req, res) => {
  try {
    const newItem = new Data({ ...req.body, userId: req.user.id });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: "error creating data", error: err.message });
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const deleted = await Data.findOneAndDelete({ id: Number(req.params.id) });
    if (!deleted) return res.status(404).json({ message: "data not found" });
    res.json({ message: "deleted", data: deleted });
  } catch (err) {
    res.status(500).json({ message: "error deleting data", error: err.message });
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const updated = await Data.findOneAndUpdate(
      { id: Number(req.params.id) },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "data not found" });
    res.json({ message: "updated", data: updated });
  } catch (err) {
    res.status(500).json({ message: "error updating data", error: err.message });
  }
});

module.exports = router;
