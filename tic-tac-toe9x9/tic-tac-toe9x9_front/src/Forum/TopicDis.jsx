import { Component } from "react";
import { Comments } from "./Comments";
import { Link } from "react-router-dom";
import { AppContext } from "../Context";

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
        ShowCommentField: false
    }

    
    componentDidMount() {
        console.log(this.context)
        this.getPostInfo()
        this.fetchData()
    }

    getPostInfo = async () => {
        const {ID} = this.state
        //this.setState({ID: this.context.PostID})

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

    showComField = (key) => {
        this.setState({
            ShowCommentField: key
        })
    }

    render() {
            const {Content, ComLoading, 
                PostError, ComError, Title, Author, 
                CommentsList, ShowCommentField} = this.state;

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
                    {Author}
                </div>
                {ShowCommentField === true ? 
                <>
                    <textarea 
                    id="large-text"
                    name="Content"
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
                    <button onClick={() => this.showComField(true)}>Убрать поле</button>
                    <button>Отправить</button>
                </>
                : 
                <button onClick={() => this.showComField(false)}>Добавить коментарий</button>
                }
                {CommentsList === null ? 
                <p>Комментарии отсутствуют</p> : <Comments data={CommentsList}/>}
                <Link to="/forum"><button>Назад</button></Link>
            </>
        )
    }
}