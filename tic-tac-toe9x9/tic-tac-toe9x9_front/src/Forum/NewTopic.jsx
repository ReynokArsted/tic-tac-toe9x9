import { Component } from "react"
import { AppContext } from "../Context"
import { Link } from "react-router-dom"

export class NewTopic extends Component {
    static contextType = AppContext
    state = {
        Title: "",
        Content: "",
        Author: this.context.Login,
        errorKey: null,
    }

    Update = (e) => { 
        const {name, value} = e.target
        this.setState({
            [name]: value,
            errorKey: null
        })
    }
    CreateTopic = async (postData) => {
        //const {Page} = this.state
        const jsonData = JSON.stringify(postData);
        try {
            const response = await fetch("http://localhost:9091/createPost", {
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/json',
                    'X-JWT-Token' : `${this.context.UserToken}`
                },
                body: jsonData
            })
            if (response.ok != null) {
                console.log(response)
            }
            const result = await response.json()
            console.log("Ответ от API:", result);
            } catch (error) {
                console.error("Ошибка:", error);
            }
    }
    CreateTopicButton = () => {
        const {Title, Content, Author} = this.state

        if (Title === "") {
            this.setState({errorKey: 1})
            return
        }
        if (Content === "") {
            this.setState({errorKey: 2})
            return
        }

        if (Title.startsWith(" ") === true || Title.endsWith(" ") === true) {
            this.setState({errorKey: 3})
            return
        }

        const data = {
            title: Title,
            content: Content,
            login: Author
        }

        this.CreateTopic(data)

        this.setState ({
            Title: "",
            Content: "",
            errorKey: 0
        })
    }

    render() {
        return (
            <>
                <h1>Создание нового обсуждения</h1>
                <div>
                    <p>Название обсуждения</p>
                    <input type="text" name="Title" onChange={(e) => this.Update(e)}></input>
                </div>
                <div>
                    <p>Описание</p>
                    <textarea 
                    id="large-text"
                    name="Content"
                    onChange={(e) => this.Update(e)}
                    placeholder="Тут можно написать о своих идеях или других предложениях"
                    rows={10} // Высота в строках
                    cols={45} // Ширина в символах
                    style={{
                        width: '100%', // Устанавливает ширину в процентах относительно родителя
                        minHeight: '150px', // Минимальная высота
                        padding: '10px', // Внутренний отступ
                        border: '1px solid #ccc', // Граница
                        borderRadius: '4px', // Закругление углов
                        fontSize: '16px', // Размер шрифта
                        lineHeight: '1.5', // Межстрочный интервал
                        margin: "10px"
                    }}
                    />
                    <button onClick={this.CreateTopicButton}>Создать</button>
                    {this.state.errorKey === 0 && <p>Новое обсуждение успешно создано!</p>}
                    {this.state.errorKey === 1 && <p>Поле с названием обсуждения оказалось пустым<br></br>
                    Пожалуйста, заполните это поле!</p>}
                    {this.state.errorKey === 2 && <p>Поле с текстом обсуждения оказалось пустым<br></br>
                    Пожалуйста, заполните это поле!</p>}
                    {this.state.errorKey === 3 && <p>В начале или конце названия обсуждения есть пробелы<br></br>
                    Пожалуйста, напишите без них!</p>}
                </div>
                <Link to="/forum"><button>Назад</button></Link>
            </>
        )
    }
}