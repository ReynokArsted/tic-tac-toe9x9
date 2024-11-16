import { Component } from "react";
import {} from "./PF_style.css"
import img from "./images/img1.png"
import forum_icon from "./images/forum.png"
import { Link } from "react-router-dom";

export class Field extends Component {
    render() {
        return (
            <>
                {/* Отображение поля
                <div className="field_position">
                    <field></field>
                    <chat></chat>
                </div>
                */}
                
                {/* Отображение начальной страницы для незарегистрированного пользователя */}
                <div className="hello_text press-start-2p-regular">
                    <p>Привет! Это место для игры в TIC-TAC-TOE9x9</p>
                    <p>Желаем приятно провести время :)</p>
                </div>
                <div className="images">
                    <div className="boarded_image">
                        <Link to="/game_rules">
                            <img className="image" src={img} alt=""></img>
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
        )
    }
}