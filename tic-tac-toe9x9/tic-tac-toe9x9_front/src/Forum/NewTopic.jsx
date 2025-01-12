import { Component } from "react"
import { AppContext } from "../App/Context"
import { Link } from "react-router-dom"

export class NewTopic extends Component {
    static contextType = AppContext;
    state = {
        Title: "",
        Content: "",
        Author: this.context.Login,
        errorKey: null,
        ShowWarning: false,
        TempTitle: "",
        TempContent: "",
        ToBack: false
    };

    Update = (e) => { 
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            errorKey: null
        });
    };

    CreateTopic = async (postData) => {
        const jsonData = JSON.stringify(postData);
        try {
            const response = await fetch("http://localhost:9091/createPost", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.context.UserToken}`
                },
                body: jsonData
            });
            if (response.ok != null) {
                console.log(response);
            }
            const result = await response.json();
            console.log("Ответ от API:", result);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    CreateTopicButton = () => {
        const { Title, Content, Author } = this.state;

        if (Title === "") {
            this.setState({ errorKey: 1 });
            return;
        }
        if (Content === "") {
            this.setState({ errorKey: 2 });
            return;
        }

        if (Title.startsWith(" ") || Title.endsWith(" ")) {
            this.setState({ errorKey: 3 });
            return;
        }

        const data = {
            title: Title,
            content: Content,
            login: Author
        };

        this.CreateTopic(data);

        this.setState({
            Title: "",
            Content: "",
            errorKey: 0
        });
    };

    ToBackButton = () => {
        const { Title, Content } = this.state;
        if (Title.trim() !== "" || Content.trim() !== "") {
            this.setState({
                ShowWarning: true,
                TempTitle: Title,
                TempContent: Content,
                ToBack: true
            });
        }
    };

    confirmHideComField = () => {
        this.setState({
            Title: "",
            Content: "",
            ShowWarning: false,
            ToBack: false
        });
    };

    cancelHideComField = () => {
        this.setState({ ShowWarning: false });
    };

    render() {
        const { ShowWarning, ToBack, errorKey, Title, Content } = this.state;
        return (
            <>
                <h1>Создание нового обсуждения</h1>
                <div>
                    <p>Название обсуждения</p>
                    <input type="text" name="Title" onChange={(e) => this.Update(e)} value={Title}></input>
                </div>
                <div>
                    <p>Описание</p>
                    <textarea 
                        id="large-text"
                        name="Content"
                        onChange={(e) => this.Update(e)}
                        placeholder="Тут можно написать о своих идеях или других предложениях"
                        rows={10}
                        cols={45}
                        value={Content}
                        style={{
                            width: '75%',
                            minHeight: '150px',
                            padding: '10px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            fontSize: '16px',
                            lineHeight: '1.5',
                            margin: "10px",
                            resize: "none"
                        }}
                    />
                    {errorKey === 0 && <p>Новое обсуждение успешно создано!</p>}
                    {errorKey === 1 && <p>Поле с названием обсуждения оказалось пустым. Пожалуйста, заполните это поле!</p>}
                    {errorKey === 2 && <p>Поле с текстом обсуждения оказалось пустым. Пожалуйста, заполните это поле!</p>}
                    {errorKey === 3 && <p>В начале или конце названия обсуждения есть пробелы. Пожалуйста, напишите без них!</p>}
                </div>

                {ShowWarning && (
                    <div className="background">
                        <div className="warning m-plus-rounded-1c-regular">
                            <p>Содержимое поста будет стёрто. Продолжить?</p>
                            {ToBack ? (
                                <Link to="/forum">
                                    <button onClick={this.confirmHideComField} style={{ marginRight: '10px' }}>Да</button>
                                </Link>
                            ) : (
                                <button onClick={this.confirmHideComField} style={{ marginRight: '10px' }}>Да</button>
                            )}
                            <button onClick={this.cancelHideComField}>Нет</button>
                        </div>
                    </div>
                )}

                {(Title.trim() === "" && Content.trim() === "") ? (
                    <>
                        <Link to="/forum">
                            <button>Назад</button>
                        </Link>
                        <button onClick={this.CreateTopicButton}>Создать</button>
                    </>
                ) : (
                    <>
                        <button onClick={this.ToBackButton}>Назад</button>
                        <button onClick={this.CreateTopicButton}>Создать</button>
                    </>
                )}
            </>
        );
    }
}
