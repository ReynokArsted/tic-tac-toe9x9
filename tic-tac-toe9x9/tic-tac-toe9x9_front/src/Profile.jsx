import { Component } from "react";
import { AppContext } from "./Context"

export class Profile extends Component {
    
    static contextType = AppContext
    render(){
        const {UserName, UserAvatarForProfile, vinNumber} = this.context
        return (
            <>
                <div>
                    <img src={UserAvatarForProfile} alt=""></img>
                    <p>{UserName}</p>
                </div>
                <div>
                    <info>
                        <p href="#">Количество побед: {vinNumber}</p>
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