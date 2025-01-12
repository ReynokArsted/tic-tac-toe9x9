import { Component } from "react";
import { AppContext } from "../App/Context"

export class Profile extends Component {
    
    static contextType = AppContext
    render(){
        const {UserName, UserAvatarForProfile, Wins, Loses} = this.context
        return (
            <>
                <div>
                    <img src={UserAvatarForProfile} alt=""></img>
                    <p>{UserName}</p>
                </div>
                <div>
                    <info>
                        <p href="#">Количество побед: {Wins}</p>
                        <p href="#">Количество поражений: {Loses}</p>
                        <p>Статус: </p>
                    </info>
                </div>
                <div>
                    <posts>
                        Посты
                    </posts>
                </div>
            </>
        )
    }
}