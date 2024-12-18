import { Component } from "react";
import { AppContext } from "./Context";
import { Link, Navigate } from "react-router-dom";

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

        /*
        try {
            const response = await fetch('https://api.example.com/topics')
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных")
            }
            const result = await response.json()
            this.setState({
            
            })
        } 
        catch (error) {
            this.setState({ 

            })
        }
        */

        this.setState ({
            login: "",
            password: "",
            name: "",
            errorKey: 0
        })

        this.context.setName(name)
        console.log(this.context.Avatar)
        this.context.login()
    }

    render () {
        const {login, password, name, showPasswordKey, errorKey, errorPlace} = this.state

        if (this.context.UserIsLoged === true){
            return <Navigate to="/profile" replace/>
        }

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
                <p>Уже зарегистрированы? Тогда можно <Link to="/sign_in">войти</Link></p>
                {errorKey === 0 && <p>Регистрация прошла успешно!</p>}
                {errorKey === 1 && <p>Одно или более полей пусты<br></br>
                Пожалуйста, заполните пустые поля!</p>}
                {errorKey === 2 && <p>В начале или конце {errorPlace} есть пробелы<br></br>
                Пожалуйста, напишите без них!</p>}
            </>
        )
    }
}