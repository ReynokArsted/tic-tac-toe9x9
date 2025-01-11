import React from 'react';
import Square from './Square';

function MiniBoard({ board, miniBoardIndex, onSquareClick, isFinished, isActive }) {
    const renderSquare = (index) => {
        return (
        <Square
            key={index}
            value={board[index]}
            onClick={() => onSquareClick(miniBoardIndex, index)}
        />
        )
    }

    return (
    <div
        className={`mini-board ${isFinished ? 'finished' : ''} ${isActive ? 'active' : ''}`}
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '2px solid #6a5acd',
            padding: '2px',
            pointerEvents: isFinished || !isActive ? 'none' : 'auto',
            backgroundColor: isFinished ? 'lightgray' : 'transparent'
        }}
    >
        {Array.from({ length: 9 }, (_, index) => renderSquare(index))}
    </div>
    )
}

export default MiniBoard;