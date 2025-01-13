import { Component } from "react";
import { Comments } from "./Comments";
import { AppContext } from "../App/Context";
import { Link } from "react-router-dom";
import {} from "./TopicDis.css"
import {} from "../GameRules/GameRules.css"

export class TopicDis extends Component {
    static contextType = AppContext
    state = {
        // Post
        ID: this.context.PostID,
        Title: "",
        Content: "",
        Author: "",
        PostError: "",
        // Comments
        CommentsList: [],
        Total: 0,
        PageSize: 0,
        Page: 1,
        ComLoading: true,
        ComError: "",
        ShowCommentField: false,
        ShowWarning: false,
        Temp: "",
        // New Comment
        NewContent: "",
        NewAuthor: this.context.Login,
        ToBack: false,
        errorKey: null
    }

    componentDidMount() {
        this.getPostInfo()
        this.fetchData()
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
                    Title: result.title,
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

    fetchData = async () => {
        const {Page, ID} = this.state
        try {
        const response = await fetch(`http://localhost:9091/getComments?page=${Page}&post_id=${ID}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.context.UserToken}`
                },
            })

            const result = await response.json()
            if (result.error !== "") {
                this.setState({ComError : result.error})
            } else {
                this.setState({
                    CommentsList: result.comments,
                    Total: result.total,
                    PageSize: result.page_size,
                    Page: result.page,
                    ComError: "",
                    ComLoading: false
                })
            }            
            console.log("Ответ от API: ", result);

            } catch (error) {
                console.error("Ошибка: ", error);
            }
    }

    Update = (e) => { 
        const {value} = e.target
        this.setState({
            NewContent: value,
            errorKey: null
        })
    }

    CreateComment = async (postData) => {
        const jsonData = JSON.stringify(postData);
        try {
            const response = await fetch("http://localhost:9091/createComment", {
                method: 'POST', 
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.context.UserToken}`
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

    CreateCommentButton = async () => {
        const {ID, NewContent, NewAuthor} = this.state

        if (NewContent === "") {
            this.setState({errorKey: 2})
            return
        }

        const data = {
            post_id: ID,
            content: NewContent,
            login: NewAuthor
        }

        await this.CreateComment(data)
        await this.fetchData()

        this.setState ({
            NewContent: "",
            ShowCommentField: false,
            errorKey: 0
        })
    }

    showComField = (key) => {
        if (key === false && this.state.ShowCommentField) {
            const content = document.getElementById("large-text")?.value || ""
            if (content.trim() !== "") {
                this.setState({
                    ShowWarning: true,
                    Temp: content,
                })
                return
            }
        }

        this.setState({
            ShowCommentField: key,
        })
    }

    confirmHideComField = () => {
        this.setState({
            NewContent: "",
            ShowCommentField: false,
            ShowWarning: false,
            ToBack: false
        })
    }

    cancelHideComField = () => {
        this.setState({
            ShowWarning: false
        })
    }

    ToBackButton = () => {
        const content = document.getElementById("large-text")?.value || ""
        if (content.trim() !== "") {
            this.setState({
                ShowWarning: true,
                Temp: content,
                ToBack: true
            })
        }
    }

    UpdateCom = async () => {
        await this.fetchData()
    }    

    render() {
            const {Content, ComLoading, 
                PostError, ComError, Title, Author, 
                CommentsList, ShowCommentField, ShowWarning, NewContent, ToBack} = this.state;

        if (ComLoading) {
            return <p>Загрузка...</p>;
        }

        if (PostError) {
            return <p>Ошибка: {PostError}</p>;
        }
        if (ComError) {
            return <p>Ошибка: {ComError}</p>;
        }

        return (
            <>
                <h1>{Title}</h1>
                <div className="text">
                    {Content}
                </div>
                <div>
                    Автор: {Author}
                </div>
                {ShowCommentField === true && 
                <>
                    <textarea
                    onChange={(e) => this.Update(e)}
                    className="postText"
                    id="large-text"
                    name="NewContent"
                    placeholder="Тут можно написать свой комментарий"
                    rows={10}
                    cols={45}
                    />
                    <div>
                        <button onClick={() => this.showComField(false)}>
                            Убрать поле
                        </button>
                        <button onClick={this.CreateCommentButton}>Создать комментарий</button>
                    </div>
                </>
                }

                {this.context.UserIsLoged === true && ShowCommentField === false && 
                <>
                <button onClick={() => this.showComField(true)}>Добавить коментарий</button>
                </>
                }

                
                {ShowWarning && (
                    <div className="background">
                        <div className="warning m-plus-rounded-1c-regular">
                            <p>Содержимое комментария будет стёрто<br></br>Продолжить?</p>
                            {ToBack === false ? 
                                <button 
                                    onClick={this.confirmHideComField} 
                                    style={{ marginRight: '10px' }}>
                                    Да
                                </button>
                                :
                                <Link to={"/forum"}>
                                    <button 
                                        onClick={this.confirmHideComField}
                                        style={{ marginRight: '10px'}}>
                                        Да
                                    </button>
                                </Link>
                            }
                            <button onClick={this.cancelHideComField}>
                                Нет
                            </button>
                        </div>
                    </div>
                )}

                {CommentsList === null ? 
                    <p>Комментарии отсутствуют</p> 
                : 
                    <Comments data={CommentsList} onUpdate={this.fetchData}
                />}
                {NewContent.trim() === "" ? (
                    <Link to="/forum">
                        <button>Назад</button>
                    </Link>
                ) : (
                <button onClick={this.ToBackButton}>
                    Назад
                    </button>
                )}
            </>
        )
    }
}