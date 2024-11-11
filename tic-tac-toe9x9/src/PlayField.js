import { Component } from "react";
import {} from "./PF_style.css"
import img from "./images/img1.png"
import forum_icon from "./images/forum.png"

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
                        <a href="">
                            <img className="image" src={img} href="#"></img>
                            <p className="font under_text press-start-2p-regular">Правила игры</p>
                        </a>
                    </div>
                    <div className="boarded_image">
                        <a href="">
                            <img className="image" src={forum_icon} href="#"></img>
                            <p className="font under_text press-start-2p-regular">Форум</p>
                        </a>
                    </div>
                </div>
            </>
        )
    }
}