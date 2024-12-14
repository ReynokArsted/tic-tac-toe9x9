import { Component } from "react";
import { AppContext } from "./Context";
import { Link, Navigate } from "react-router-dom";

export class SignIn extends Component {
    state = {
        login: "",
        password: "",
        showPasswordKey: false,
        errorKey: null,
        errorPlace: null
    }

    static contextType = AppContext

    UpdateData = (e) => { 
        const {name, value} = e.target
        this.setState({
            [name]: value,
            errorKey: null
        })
    }

    ShowPassword = () => {
        this.setState ({
            showPasswordKey: !this.state.showPasswordKey
        })
    }

    LogButtonClicked = () => {
        const {login, password} = this.state
        console.log(`Логин: ${login}`)
        console.log(`Пароль: ${password}`)

        if (login === "" || password === "") {
            this.setState({errorKey: 1})
            return
        }

        if (login.startsWith(" ") === true || login.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "логина"})
            return
        }
        if (password.startsWith(" ") === true || password.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "пароля"})
            return
        }

        this.setState ({
            login: "",
            password: "",
            errorKey: 0
        })

        this.context.login()
    }

    render () {
        const { login, password, showPasswordKey, errorKey, errorPlace} = this.state

        if (this.context.UserIsLoged === true){
            return <Navigate to="/" replace/>
        }

        return (
            <>
                <label>Вход</label>
                <div>
                    <label>логин</label>
                    <input name="login" value={login} onChange={(e) => this.UpdateData(e)}/>
                </div>
                <div>
                    <label>пароль</label>
                    <input type={showPasswordKey ? "text" : "password"} name="password" value={password} onChange={(e) => this.UpdateData(e)}/>
                    <button onClick={this.ShowPassword}>{showPasswordKey ? "Скрыть" : "Показать"}</button>
                </div>
                <button onClick={this.LogButtonClicked}>Войти</button>
                <p>Впервые тут? Тогда можно <Link to="/sign_up">зарегистироваться</Link></p>
                {errorKey === 0 && <p>Вход прошёл успешно!</p>}
                {errorKey === 1 && <p>Одно или более полей пусты<br></br>
                Пожалуйста, заполните пустые поля!</p>}
                {errorKey === 2 && <p>В начале или конце {errorPlace} есть пробелы<br></br>
                Пожалуйста, напишите без них!</p>}
            </>
        )
    }
}