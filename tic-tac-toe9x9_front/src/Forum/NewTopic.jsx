import { Component } from "react"
import { AppContext } from "../Context"

export class NewTopic extends Component {
    static contextType = AppContext
    state = {
        TopicName: "",
        TopicText: "",
        UserName: this.context.UserName,
        errorKey: null,
    }

    Update = (e) => { 
        const {name, value} = e.target
        this.setState({
            [name]: value,
            errorKey: null
        })
    }

    CreateTopic = () => {
        const {TopicName, TopicText} = this.state
        /*
        try {
            const response = await fetch('https://api.example.com/topics')
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных")
            }
            const result = await response.json()
            this.setState({ 
                data: result, 
                loading: false,
                id: id,
                name: name
            })
        } 
        catch (error) {
            this.setState({ 
                error: error.message, 
                loading: false 
            })
        }
        */

        console.log(`Название обсуждения: ${TopicName}`)

        if (TopicName === "") {
            this.setState({errorKey: 1})
            return
        }
        if (TopicText === "") {
            this.setState({errorKey: 2})
            return
        }

        if (TopicName.startsWith(" ") === true || TopicName.endsWith(" ") === true) {
            this.setState({errorKey: 3})
            return
        }

        this.setState ({
            TopicName: "",
            TopicText: "",
            errorKey: 0
        })
    }

    render() {
        return (
            <>
                <h1>Создание нового обсуждения</h1>
                <div>
                    <p>Название обсуждения</p>
                    <input type="text" name="TopicName" onChange={(e) => this.Update(e)}></input>
                </div>
                <div>
                    <p>Описание</p>
                    <textarea 
                    id="large-text"
                    name="TopicText"
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
                    <button onClick={this.CreateTopic}>Создать</button>
                    {this.state.errorKey === 0 && <p>Новое обсуждение успешно создано!</p>}
                    {this.state.errorKey === 1 && <p>Поле с названием обсуждения оказалось пустым<br></br>
                    Пожалуйста, заполните это поле!</p>}
                    {this.state.errorKey === 2 && <p>Поле с текстом обсуждения оказалось пустым<br></br>
                    Пожалуйста, заполните это поле!</p>}
                    {this.state.errorKey === 3 && <p>В начале или конце названия обсуждения есть пробелы<br></br>
                    Пожалуйста, напишите без них!</p>}
                </div>
            </>
        )
    }
}