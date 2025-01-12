import React from 'react';
import {} from './Square.css'

function Square({ value, onClick }) {
    return (
        <button
            className="square"
            onClick={onClick}
            style={{
                backgroundColor: value === 'X' ? '#a599f0' : value === 'O' ? '#F4F9B4' : 'white',
            }}
            >
            {value}
        </button>
    );
}

export default Square;