import { Component } from "react";
import { AppContext } from "./Context";



export class SignUp extends Component {
    state = {
        login: "",
        password: "",
        name: "",
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
        const {login, password, name} = this.state
        console.log(`Логин: ${login}`)
        console.log(`Пароль: ${password}`)
        console.log(`Имя игрока: ${name}`)

        if (login === "" || password === "" || name === "") {
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
        if (name.startsWith(" ") === true || name.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "имени"})
            return
        }

        this.setState ({
            login: "",
            password: "",
            name: "",
            errorKey: 0
        })

        this.context.setName(name)
        this.context.login()
    }

    render () {
        const { login, password, name, showPasswordKey, errorKey, errorPlace} = this.state
        return (
            <>
                <label>Регистрация</label>
                <div>
                    <label>логин</label>
                    <input name="login" value={login} onChange={(e) => this.UpdateData(e)}/>
                </div>
                <div>
                    <label>пароль</label>
                    <input type={showPasswordKey ? "text" : "password"} name="password" value={password} onChange={(e) => this.UpdateData(e)}/>
                    <button onClick={this.ShowPassword}>{showPasswordKey ? "Скрыть" : "Показать"}</button>
                </div>
                <div>
                    <label>имя игрока/никнейм</label>
                    <input name="name" value={name} onChange={(e) => this.UpdateData(e)}/>
                </div>
                <button onClick={this.LogButtonClicked}>Зарегистироваться</button>
                {errorKey === 0 && <p>Регистрация прошла успешно!</p>}
                {errorKey === 1 && <p>Одно или более полей пусты<br></br>
                Пожалуйста, заполните пустые поля!</p>}
                {errorKey === 2 && <p>В начале или конце {errorPlace} есть пробелы<br></br>
                Пожалуйста, напишите без них!</p>}
            </>
        )
    }
}