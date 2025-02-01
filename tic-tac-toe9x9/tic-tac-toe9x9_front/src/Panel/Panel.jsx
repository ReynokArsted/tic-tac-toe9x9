import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import {} from "./style.css"
import { AppContext } from "../App/Context"

export class Panel extends Component {
    static contextType = AppContext
    render() {
        const {UserIsLoged, UserName, UserAvatarForPanel, logout} = this.context
        return (
            <>
                <div className="header position">
                    <div className="actions press-start-2p-regular">
                        <Link 
                        className="boarded" to={UserIsLoged === false ? "/sign_up" : "/game"}
                        >Начать игру</Link>
                        <Link className="boarded" to="/game_rules">Правила игры</Link>
                    </div>
                    <Link className="logo logo_font" to="/">TIC-TAC-TOE9x9</Link>
                    <div className="actions press-start-2p-regular">
                        {UserIsLoged === false ?
                            <>
                                <Link className="boarded" to="/forum">Форум</Link>
                                <Link className="boarded" to="/sign_in">Войти</Link>
                                <Link className="boarded" to="/sign_up">Зарегистироваться</Link>
                            </>
                            :
                            <>
                                <Link className="boarded" to="/forum">Форум</Link>
                                <Link style={{
                                    color: "#F4F9B4",
                                    marginLeft: "5px",
                                    marginRight: "5px"
                                    }} to="/profile">
                                        <span
                                        href="#"
                                        style={{
                                        marginLeft: "5px",
                                        marginRight: "5px"
                                        }}>
                                            {UserName}
                                        </span>
                                    <img 
                                        style={{
                                            border: 'solid 0px white',
                                        }}
                                        src={UserAvatarForPanel} alt=""></img>
                                </Link>
                                <Link className="boarded" onClick={logout}>Выйти</Link>
                            </>
                        }
                    </div>
                </div>
                <Outlet />
            </>
        )
    }
}