const express = require("express");
const router = express.Router();

const news = [
  {
    id: 1,
    title: "RBI increases repo rate",
    content: "The Reserve Bank increased rates to control inflation...",
    category: "Finance"
  },
  {
    id: 2,
    title: "Startup raises funding",
    content: "A startup raised $10M to expand operations...",
    category: "Startup"
  }
];

router.get("/", (req, res) => {
  res.json(news);
});

module.exports = router;