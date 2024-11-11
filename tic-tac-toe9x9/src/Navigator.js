import { Component } from "react";
import {} from "./style.css"

export class Panel extends Component {
    state = {
        user: "logged/unlogged"
    }

    render() {
        return (
            <>
                <div className="position">
                    <div className="actions press-start-2p-regular">
                        <a className="boarded" href="">Начать игру</a>
                        <a className="boarded" href="">Правила игры</a>
                    </div>
                    <logo className="logo logo_font">TIC-TAC-TOE9x9</logo>
                    <div className="actions press-start-2p-regular">
                        <a className="boarded" href="">Войти</a>
                        <a className="boarded" href="">Зарегистироваться</a>
                    </div>
                </div>
            </>
        )
    }
}