const express = require('express');
const router = express.Router();

router.post('/move', (req, res) => {
  const { board, currentPlayer } = req.body;

  // Placeholder for actual AI move logic
  const aiMove = board.indexOf("");

  res.json({
    board: board.map((cell, idx) => (idx === aiMove ? "O" : cell)),
    currentPlayer: "X"
  });
});

module.exports = router;
