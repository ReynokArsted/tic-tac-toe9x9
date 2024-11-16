import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import {} from "./style.css"

export class Panel extends Component {
    render() {
        return (
            <>
                <div className="position">
                    <div className="actions press-start-2p-regular">
                        <Link className="boarded" to="/game">Начать игру</Link>
                        <Link className="boarded" to="/game_rules">Правила игры</Link>
                    </div>
                    <Link className="logo logo_font" to="/">TIC-TAC-TOE9x9</Link>
                    <div className="actions press-start-2p-regular">
                        <Link className="boarded" to="/sign_in">Войти</Link>
                        <Link className="boarded" to="/sign_up">Зарегистироваться</Link>
                    </div>
                </div>
                <Outlet/>
            </>
        )
    }
}