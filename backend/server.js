const express = require('express');
const app = express();
const port = 3000;
const gameRoutes = require('./routes/game');

app.use(express.json());
app.use('/game', gameRoutes);

app.listen(port, () => {
  console.log(`Tic-Tac-Toe backend running at http://localhost:${port}`);
});
