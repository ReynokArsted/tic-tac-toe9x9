import { Component } from "react";
import {} from "./MainPage.css"
import rules_icon from "../images/img1.png"
import forum_icon from "../images/forum.png"
import game_icon from "../images/game.png"
import { Link } from "react-router-dom";
import { AppContext } from "../App/Context";

export class MainPage extends Component {
    static contextType = AppContext
    render() {
        const {UserIsLoged, UserName} = this.context
        return (
            <>
                {UserIsLoged === false &&
                <>
                    <div className="hello_text press-start-2p-regular">
                        <p>Привет! Это место для игры в TIC-TAC-TOE9x9</p>
                        <p>Желаем приятно провести время :)</p>
                    </div>
                    <div className="images">
                        <div className="boarded_image">
                            <Link to="/game_rules">
                                <img className="image" src={rules_icon} alt=""></img>
                                <p className="font under_text press-start-2p-regular">Правила игры</p>
                            </Link>
                        </div>
                        <div className="boarded_image">
                            <Link to="/forum">
                                <img className="image" src={forum_icon} alt=""></img>
                                <p className="font under_text press-start-2p-regular">Форум</p>
                            </Link>
                        </div>
                    </div>
                </>
                }
                {UserIsLoged === true && 
                <>
                    {/* Отображение начальной страницы для зарегистрированного пользователя */}
                    <div className="hello_text press-start-2p-regular">
                        <p>Привет, {UserName}!</p>
                        <p>Готовы начать игру?</p>
                    </div>
                    <div className="images">
                        <div className="boarded_image">
                            <Link to="/game_rules">
                                <img className="image" src={rules_icon} alt=""></img>
                                <p className="font under_text press-start-2p-regular">Правила игры</p>
                            </Link>
                        </div>
                        <div className="boarded_image">
                            <Link to="/game">
                                <img className="image" src={game_icon} alt=""></img>
                                <p className="font under_text press-start-2p-regular">Начать игру</p>
                            </Link>
                        </div>
                        <div className="boarded_image">
                            <Link to="/forum">
                                <img className="image" src={forum_icon} alt=""></img>
                                <p className="font under_text press-start-2p-regular">Форум</p>
                            </Link>
                        </div>
                    </div>
                
                </>
                }
            </>
        )
    }
}