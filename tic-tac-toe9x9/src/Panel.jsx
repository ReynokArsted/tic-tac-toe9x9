import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import {} from "./style.css"
import { AppContext } from "./Context"

export class Panel extends Component {
    static contextType = AppContext
    render() {
        const {UserIsLoged, UserName, Avatar, logout} = this.context
        return (
            <>
                <div className="position">
                    <div className="actions press-start-2p-regular">
                        <Link className="boarded" to="/game">Начать игру</Link>
                        <Link className="boarded" to="/game_rules">Правила игры</Link>
                    </div>
                    <Link className="logo logo_font" to="/">TIC-TAC-TOE9x9</Link>
                    <div className="actions press-start-2p-regular">
                        {UserIsLoged === false ?
                            <>
                                <Link className="boarded" to="/sign_in">Войти</Link>
                                <Link className="boarded" to="/sign_up">Зарегистироваться</Link>
                            </>
                            :
                            <>
                                <Link>{UserName}</Link>
                                <img src={Avatar} alt=""></img>
                                <Link onClick={logout}>Выйти</Link>
                            </>
                        }
                    </div>
                </div>
                <Outlet />
            </>
        )
    }
}