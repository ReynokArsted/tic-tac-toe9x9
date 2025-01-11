import React, { useState, useEffect } from 'react';
import Board from './Board';
import { checkWinner } from '../utils/helpers';

function Game() {
    const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [activeMiniBoard, setActiveMiniBoard] = useState(null);
    const [finishedMiniBoards, setFinishedMiniBoards] = useState([]);
    const [scores, setScores] = useState({ X: 0, O: 0 });
    const [winner, setWinner] = useState(null);

    const handleSquareClick = (miniBoardIndex, squareIndex) => {
        if (winner) return; // Завершить, если есть победитель

        if (finishedMiniBoards.includes(miniBoardIndex)) {
             if (activeMiniBoard !== null) return; //Завершаем функцию, если есть активное поле и оно не подходит
        }
        const nextBoard = board.map((miniboard, mbIndex) => {
                if (mbIndex !== miniBoardIndex) return miniboard
            return miniboard.map((value, sIndex) => {
            if (sIndex === squareIndex && value === null) return currentPlayer;
            return value
        })
        })

        setBoard(nextBoard);


        // Проверка на победу в поле 3x3
         const miniBoardWinner = checkWinner(nextBoard[miniBoardIndex])
          if (miniBoardWinner) {
              setFinishedMiniBoards((prev) => [...prev, miniBoardIndex])
              setScores((prevScores) => ({
                  ...prevScores,
                  [currentPlayer]: prevScores[currentPlayer] + 1,
              }));
          }

        const nextActiveMiniBoard = finishedMiniBoards.includes(squareIndex) ? null : squareIndex

        setActiveMiniBoard(nextActiveMiniBoard);

       setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');

    };

    useEffect(() => {
         const overallWinner = checkWinner(finishedMiniBoards);
         if (overallWinner){
              setWinner(overallWinner);
         }
    }, [finishedMiniBoards])


   const renderGameStatus = () => {
       if (winner) {
            return `Победитель: ${winner}`;
       } else if(finishedMiniBoards.length === 9) {
           return `Ничья`;
       } else {
           return `Следующий игрок: ${currentPlayer}`
       }
   }

    return (
        <div>
            <div>{renderGameStatus()}</div>
            <div >Счёт: X - {scores.X}, O - {scores.O}</div>
            <Board
                board={board}
                activeMiniBoard={activeMiniBoard}
                finishedMiniBoards={finishedMiniBoards}
                onSquareClick={handleSquareClick}
            />
        </div>
    );
}

export default Game;