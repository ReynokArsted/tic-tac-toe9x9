const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let gameState = {
  Board: Array(9).fill(null).map(() => Array(9).fill(null)), // Массив для 9 полей
  NextStep: true, // Ход X или O
  Scores: { X: 0, O: 0 },
  currentField: null, // Текущие доступные поля для ходов
};

io.on('connection', (socket) => {
  console.log('A user connected');

  // Отправить текущее состояние игры
  socket.emit('gameState', gameState);

  // Получение хода от клиента
  socket.on('makeMove', ({ fieldIndex, index }) => {
    if (gameState.Board[fieldIndex][index] || gameState.winner) return;

    // Сделать ход
    gameState.Board[fieldIndex][index] = gameState.NextStep ? 'X' : 'O';
    gameState.NextStep = !gameState.NextStep;

    // Проверка на победителя
    const winner = checkWinner(gameState.Board[fieldIndex]);
    if (winner) {
      gameState.winner = winner;
      gameState.Scores[winner]++;
      io.emit('gameOver', gameState.Scores);
    }

    // Отправить обновленное состояние всем игрокам
    io.emit('gameState', gameState);
  });

  // Отключение игрока
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Проверка на победителя
const checkWinner = (Board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (Board[a] && Board[a] === Board[b] && Board[a] === Board[c]) {
      return Board[a];
    }
  }

  return null;
};

server.listen(4000, () => {
  console.log('Server running on port 4000');
});
