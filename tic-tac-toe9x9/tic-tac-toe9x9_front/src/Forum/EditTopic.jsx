import { Component } from "react";
import { AppContext } from "../App/Context";
import { Link } from "react-router-dom";
import {} from "./Comments.css"

export class EditTopic extends Component {
    static contextType = AppContext;
    state = {
        ID: this.context.PostID,
        OldTitle: "",
        Title: "",
        OldContent: "",
        Content: "",
        Author: "",
        errorKey: null,
        ShowWarning: false,
        TempTitle: "",
        TempContent: "",
        ToBack: false,
        ToDelete: false
    }

    componentDidMount() {
        this.getPostInfo()
    }

    Update = (e) => { 
        const { name, value } = e.target;
        this.setState({
            [name]: value,
            errorKey: null
        })
    }

    getPostInfo = async () => {
        const {ID} = this.state
        try {
            const response = await fetch(`http://localhost:9091/getPostById?post_id=${ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.context.UserToken}`
                }
            })
            const result = await response.json()
            if (result.error !== "") {
                this.setState({PostError : result.error})
            } else {
                this.setState({
                    OldTitle: result.title,
                    Title: result.title,
                    OldContent: result.content,
                    Content: result.content,
                    Author: result.login
                })
            }
            console.log("Ответ от API: ", result)
        }
        catch(error) {
            console.error("Ошибка: ", error)
        }
    }

    UpdateTopic = async (postData) => {
        const { ID } = this.state
        const jsonData = JSON.stringify(postData)
        try {
            const response = await fetch(`http://localhost:9091/updatePost?post_id=${ID}`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.context.UserToken}`
                },
                body: jsonData
            })
            if (response.ok != null) {
                console.log(response)
            }
            const result = await response.json()
            console.log("Ответ от API:", result)
        } catch (error) {
            console.error("Ошибка:", error)
        }
    }

    DeletePost = async () => { 
        const {ID} = this.state
        try {
            const response = await fetch(`http://localhost:9091/deletePostById?post_id=${ID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.context.UserToken}`
                }
            })
            const result = await response.json()
            if (result.error !== "") {
                this.setState({PostError : result.error})
            } else {
                this.setState({
                    OldTitle: "",
                    Title: "",
                    OldContent: "",
                    Content: "",
                    Author: "",
                    ToDelete: false
                })
            }
            console.log("Ответ от API: ", result)
        }
        catch(error) {
            console.error("Ошибка: ", error)
        }
    }

    ToDeleteButton = () => {
        const { Title, Content } = this.state
        if (Title.trim() !== "" || Content.trim() !== "") {
            this.setState({
                ShowWarning: true,
                TempTitle: Title,
                TempContent: Content,
                ToBack: true,
                ToDelete: true
            })
        }
    }

    UpdateTopicButton = () => {
        const { Title, Content, OldContent, OldTitle} = this.state

        if (Title === "") {
            this.setState({ errorKey: 1 })
            return
        }
        if (Content === "") {
            this.setState({ errorKey: 2 })
            return
        }

        if (Title.startsWith(" ") || Title.endsWith(" ")) {
            this.setState({ errorKey: 3 })
            return
        }

        if (OldContent === Content && OldTitle === Title) {
            this.setState({ errorKey: 4 })
            return
        }

        const data = {
            title: Title,
            content: Content,
        }

        this.UpdateTopic(data)

        this.setState({
            Title: "",
            Content: "",
            errorKey: 0
        })
    }

    ToBackButton = () => {
        const { Title, Content } = this.state
        if (Title.trim() !== "" || Content.trim() !== "") {
            this.setState({
                ShowWarning: true,
                TempTitle: Title,
                TempContent: Content,
                ToBack: true
            })
        }
    }

    confirmHideComField = () => {
        this.setState({
            Title: "",
            Content: "",
            ShowWarning: false,
            ToBack: false
        })
    }

    cancelHideComField = () => {
        this.setState({ ShowWarning: false })
    }

    render() {
        const { ShowWarning, ToBack, errorKey, OldTitle, 
            Title, OldContent, Content, ToDelete } = this.state
        return (
            <div className="m-plus-rounded-1c-regular">
                <h1>Редактирование поста</h1>
                <div>
                    <p>Название обсуждения</p>
                    <input 
                    type="text" 
                    name="Title" 
                    onChange={(e) => this.Update(e)} 
                    value={Title}>
                    </input>
                </div>
                <div>
                    <p>Описание</p>
                    <textarea 
                        id="large-text"
                        name="Content"
                        onChange={(e) => this.Update(e)}
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
                    {errorKey === 0 && 
                    <p>
                        Пост успешно обновлен!
                    </p>}
                    {errorKey === 1 && 
                    <p>
                        Поле с названием обсуждения оказалось пустым. Пожалуйста, заполните это поле!
                    </p>}
                    {errorKey === 2 && 
                    <p>
                        Поле с текстом обсуждения оказалось пустым. Пожалуйста, заполните это поле!
                    </p>}
                    {errorKey === 3 && 
                    <p>
                        В начале или конце названия обсуждения есть пробелы. 
                        Пожалуйста, напишите без них!
                    </p>}
                    {errorKey === 4 && 
                    <p>
                        Ни название, ни содержимое не изменились!
                    </p>}
                </div>

                {ShowWarning && (
                    <div className="background">
                        <div className="warning m-plus-rounded-1c-regular">
                            {ToDelete === true ? 
                                <p>Пост будет удалён безвозвратно<br></br>Продолжить?</p> 
                            :
                                <p>Содержимое поста будет стёрто<br></br>Продолжить?</p>
                            }
                            {ToBack === true ? (
                                <Link to="/user_topics">
                                    {ToDelete === true ? 
                                        <button 
                                            onClick={() => {
                                                this.confirmHideComField()
                                                this.DeletePost()
                                            }} 
                                            style={{ marginRight: '10px' }}>
                                            Да
                                        </button>
                                    :
                                        <button 
                                            onClick={this.confirmHideComField} 
                                            style={{ marginRight: '10px' }}>
                                            Да
                                        </button>
                                    }
                                </Link>
                            ) : (
                                <button 
                                    onClick={this.confirmHideComField} 
                                    style={{ marginRight: '10px' }}>
                                    Да
                                </button>
                            )}
                            <button onClick={this.cancelHideComField}>Нет</button>
                        </div>
                    </div>
                )}

                {((Title.trim() === "" && Content.trim() === "") || 
                (Title.trim() === OldTitle && Content.trim() === OldContent)) ? (
                    <>
                        <Link to="/user_topics">
                            <button>Назад</button>
                        </Link>
                        <button onClick={this.UpdateTopicButton}>Обновить</button>
                        <button onClick={this.ToDeleteButton}>Удалить пост</button>
                    </>
                ) : (
                    <>
                        <button onClick={this.ToBackButton}>Назад</button>
                        <button onClick={this.UpdateTopicButton}>Обновить</button>
                        <button onClick={this.ToDeleteButton}>Удалить пост</button>
                    </>
                )}
            </div>
        )
    }
}