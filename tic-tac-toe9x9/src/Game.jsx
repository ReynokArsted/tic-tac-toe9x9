/*import { Component } from "react"
import io from 'socket.io-client'

export class Square extends Component {
    render() {
        console.log('Rendering Square with value:', this.props.value);
        return (
            <button
            style={{
                width: '60px',
                height: '60px',
                fontSize: '24px',
                display: 'inline-block',
                border: '1px solid black',
                backgroundColor: 'white', 
            }} 
            onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}

export class Board extends Component {
    state = {
        Board: Array(9).fill(null).map(() => ({squares: Array(9).fill(null), winner: null})),
        NextStep: true,
        Scores: {X: 0, O: 0}
    }

    componentDidMount() {
        this.socket = io('http://localhost:4000')

        this.socket.on('gameState', (gameState) => {
            if (gameState && gameState.Board) {
                this.setState({
                    Board: gameState.Board,
                    NextStep: gameState.NextStep,
                    Scores: gameState.Scores
                })
            } else {
                console.error("Ошибка в обновлении состояния игры:", gameState);
            }
        })


        this.socket.on('gameOver', (finalScores) => {
            alert(`Игра завершена! Победители X - ${finalScores.X} O - ${finalScores.O}`)
        })
    }

    componentWillUnmount() {
        if (this.socket) {
            this.socket.disconnect()
        }
    }

    IsEndGame = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

            for (let line of lines) {
                const [a, b, c] = line
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a]
                }
        }

        return null
    }

    RenderSquare = (fieldIndex, index) => {
        const field = this.state.Board[fieldIndex]
        return (
            <Square
            value={field.squares[index]}
            onClick={() => {this.SClick(fieldIndex, index)}}
            />
        )
    }

    RenderBoard = (fieldIndex) => {
        return(
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex' }}>
                {this.RenderSquare(fieldIndex, 0)}
                {this.RenderSquare(fieldIndex, 1)}
                {this.RenderSquare(fieldIndex, 2)}
            </div>
            <div style={{ display: 'flex' }}>
                {this.RenderSquare(fieldIndex, 3)}
                {this.RenderSquare(fieldIndex, 4)}
                {this.RenderSquare(fieldIndex, 5)}
            </div>
            <div style={{ display: 'flex' }}>
                {this.RenderSquare(fieldIndex, 6)}
                {this.RenderSquare(fieldIndex, 7)}
                {this.RenderSquare(fieldIndex, 8)}
            </div>
            </div>
        )
    }

    SClick = (fieldIndex, index) => {
        console.log("SClick invoked with index:", index);
        const {Board, NextStep} = this.state
        const field = Board[fieldIndex]

        if (field.squares[index] || field.winner) {
            console.log("Игра закончена или клетка занята");
            return
        }

        // Сделать ход в поле
        field.squares[index] = NextStep ? 'X' : 'O';
    
        // Изменить шаг для следующего игрока
        this.setState({ NextStep: !NextStep });

        this.socket.emit('makeMove', {fieldIndex, index})
    }
    render() {
        const {Scores, NextStep, Board} = this.state
        const status = `Следующий ход: ${NextStep ? "X" : "O"}`
        const scoresText = Scores ? `Счёт: X - ${Scores.X}, O - ${Scores.O}` : `Загружается...`

        return (
            <div>
            <div style={{ marginBottom: '10px' }}>{status}</div>
            <div>{scoresText}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {Board.map((_, index) => this.RenderBoard(index))}
            </div>
        </div>
        )
    }
}

export class Game extends Component {
    //static contextType = AppContext
    render() {
        return (
            <>
                <div className="field_position">
                <field style= {{
                    textAlign: "center",
                    marginTop: "20px"
                }}></field>
                <chat></chat>
                </div>
                <Board/>
            </>
        )
    }
}

*/


import { Component } from "react";
//import io from 'socket.io-client';

export class Square extends Component {
    render() {
        return (
            <button
                style={{
                    width: '50px',
                    height: '50px',
                    fontSize: '24px',
                    display: 'inline-block',
                    border: '1px solid black',
                    backgroundColor: 'white', 
                }} 
                onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

export class Board extends Component {
    state = {
        Board: Array(9).fill(null).map(() => Array(9).fill(null)),
        ChangePlayer: true,
        Scores: { X: 0, O: 0 },
        winner: null,
        //currentField: null,
    };

    componentDidMount() {
        // Подключение к серверу

        // Получить обновление состояния игры

        // Обработка завершения игры
    }

    componentWillUnmount() {
        // Обработка отключения от сервера
    }

    // Обработчик клика на клетку
    SClick = (fieldIndex, index) => {
        
        // Проверка, завершена ли игра или занята ли клетка, или заполнено ли большее поле

        // Отправить информвцию о ходе на сервер
    };

    RenderSquare = (fieldIndex, index) => {
        const field = this.state.Board[fieldIndex];
        return (
            <Square
                key={index}
                value={field[index]}
                onClick={() => this.SClick(fieldIndex, index)}
            />
        );
    };

    RenderBoard = () => {
        return (
            // Поменять способ рендера!
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px' }}>
                {this.state.Board.map((_, fieldIndex) => (
                    <div key={fieldIndex} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0px' }}>
                        {Array.from({ length: 9 }, (_, index) => this.RenderSquare(fieldIndex, index))}
                    </div>
                ))}
            </div>
        );
    };

    render() {
        const { Scores, NextStep, winner } = this.state;
        const status = `Следующий ход: ${NextStep ? "X" : "O"}`;
        const scoresText = `Счёт: X - ${Scores.X}, O - ${Scores.O}`;
        const gameStatus = winner ? `${winner} победил!` : status;

        return (
            <div>
                <div style={{ marginBottom: '10px' }}>{gameStatus}</div>
                <div>{scoresText}</div>
                <div>{this.RenderBoard()}</div>
            </div>
        );
    }
}

export class Game extends Component {
    render() {
        return (
            <>
                <div className="field_position">
                <field className="field"><Board/></field>
                <chat></chat>
                </div>
            </>
        );
    }
}
