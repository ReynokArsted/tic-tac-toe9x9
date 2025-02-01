import { Component } from "react";
import { AppContext } from "../App/Context"
import {} from "./Profile.css"
import {} from "../Forum/Comments.css"

export class Profile extends Component {
    
    static contextType = AppContext
    render(){
        const {UserName, UserAvatarForProfile, Wins, Loses} = this.context
        return (
            <div className="m-plus-rounded-1c-regular profile_border">
                <div>
                    <img src={UserAvatarForProfile} alt=""></img>
                    <p>Имя: {UserName}</p>
                </div>
                <div className="profile_data">
                    <info>
                        <p href="#">Количество побед: {Wins}</p>
                        <p href="#">Количество поражений: {Loses}</p>
                    </info>
                </div>
            </div>
        )
    }
}