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
        errorPlace: null,
        SignUpError: ""
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

    SignUp = async (userData) => {
        const {login, setToken} = this.context
        const jsonData = JSON.stringify(userData)
        try {
            const response = await fetch('http://localhost:9090/singUp', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: jsonData, 
            });

            const token = response.headers.get("X-JWT-Token");

            const result = await response.json()
            if (result.error !== "") {
                this.setState({SignUpError : result.error})
            } else {
                this.setState({SignUpError: ""})
                login(result) // Функция для обновления контекста
                setToken(token)
            }
            console.log("Ответ от API:", result);

            } catch (error) {
                console.error("Ошибка:", error);
            }
}            

    LogButtonClicked = async () => {
        const {login, password, name} = this.state

        if (login === "" || password === "" || name === "") {
            this.setState({errorKey: 1, SignUpError: ""})
            return
        }

        if (login.startsWith(" ") === true || login.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "логина", SignUpError: ""})
            return
        }
        if (password.startsWith(" ") === true || password.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "пароля", SignUpError: ""})
            return
        }
        if (name.startsWith(" ") === true || name.endsWith(" ") === true) {
            this.setState({errorKey: 2, errorPlace: "имени", SignUpError: ""})
            return
        }

        const data = {
            login: login,
            password: password,
            username: name,
            win: 0,
            lose: 0,
            error: ""
        }

        await this.SignUp(data)

        this.setState ({
            login: "",
            password: "",
            name: "",
            errorKey: 0
        })
    }

    render () {
        const {
            login, password, name, 
            showPasswordKey, errorKey, errorPlace, SignUpError
        } = this.state

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
                    <input 
                    type={showPasswordKey ? "text" : "password"} 
                    name="password" value={password} 
                    onChange={(e) => this.UpdateData(e)}
                    />
                    <button 
                    onClick={this.ShowPassword}>{showPasswordKey ? "Скрыть" : "Показать"}
                    </button>
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
                {SignUpError !== "" && <p>Ошибка: {SignUpError}</p>}
            </>
        )
    }
}