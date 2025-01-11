import React from 'react';

function Square({ value, onClick }) {
    return (
        <button
            className="square"
            onClick={onClick}
            style={{
                width: '30px',
                height: '30px',
                fontSize: '20px',
                display: 'inline-block',
                border: '1px solid black',
                backgroundColor: value === 'X' ? '#add8e6' : value === 'O' ? '#ffb6c1' : 'white',
                padding: '0px'
            }}
            >
            {value}
        </button>
    );
}

export default Square;