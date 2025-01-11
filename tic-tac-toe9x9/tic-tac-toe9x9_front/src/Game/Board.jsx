import React from 'react';
import MiniBoard from './MiniBoard';

function Board({ board, activeMiniBoard, onSquareClick, finishedMiniBoards}) {
    const renderMiniBoard = (index) => {
        const isFinished = finishedMiniBoards.includes(index)
        return (
            <MiniBoard
                key={index}
                miniBoardIndex={index}
                board={board[index]}
                onSquareClick={onSquareClick}
                isFinished={isFinished}
                isActive={activeMiniBoard === null || activeMiniBoard === index} // Поле активно, если оно выбрано, или нет активных полей
            />
        );
    };

    return (
        <div className="board"
            style={{
                display: 'flex',
                alignContent: 'center',
                alignItems: 'center'
            }}>
            <div
                style={{
                    width: '100px',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '5px'
                }}>
            {Array.from({ length: 9 }, (_, index) => renderMiniBoard(index))}
            </div>
        </div>
    );
}

export default Board;