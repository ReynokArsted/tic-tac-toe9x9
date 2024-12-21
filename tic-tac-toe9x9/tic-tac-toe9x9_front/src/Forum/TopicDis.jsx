import { Component } from "react";
import { Comments } from "./Comments";
import { Link } from "react-router-dom";
import { AppContext } from "../Context";

export class TopicDis extends Component {
    state = {
        // Post
        ID: "",
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

    static contextType = AppContext
    
    componentDidMount() {
        console.log(this.context)
        this.updateData()
        this.fetchData()
    }

    componentWillUnmount() {
        const {setPosID, setTitle, setContent, setAuthor} = this.context
        setPosID("")
        setTitle("")
        setContent("")
        setAuthor("")
    }

    updateData = () => {
        const { PostID, PostTitle, PostAuthor, PostContent } = this.context;
        if (
            this.state.ID !== PostID ||
            this.state.Title !== PostTitle ||
            this.state.Author !== PostAuthor ||
            this.state.Content !== PostContent
        ) {
            this.setState({
                ID: PostID,
                Title: PostTitle,
                Author: PostAuthor,
                Content: PostContent,
            })
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
            console.log("Ответ от API:", result);

            } catch (error) {
                console.error("Ошибка:", error);
            }
    }

    showComField = (key) => {
        this.setState({
            ShowCommentField: key
        })
    }

    resetPostContext = () => {
        const { setPosID, setTitle, setContent, setAuthor } = this.context;
        if (this.context.PostID || this.context.PostTitle || 
            this.context.PostContent || this.context.PostAuthor) {
            setPosID("");
            setTitle("");
            setContent("");
            setAuthor("");
        }
    }

    render() {
            const {Content, ComLoading, 
                PostError, ComError, Title, Author, 
                CommentsList, ShowCommentField} = this.state;

        //if (ComLoading) {
        //    return <p>Загрузка...</p>;
        //}

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
                <Comments data={CommentsList}/>
                <Link to="/forum"><button onClick={this.resetPostContext}>Назад</button></Link>
            </>
        )
    }
}