import { Component } from "react";
import { Comments } from "./Comments";
import { PostContext } from "../Context";
import { Link } from "react-router-dom";

export class TopicDis extends Component {
    state = {
        // Post
        ID: "",
        Title: "",
        Content: "",
        Author: "",
        PostError: "",
        PostLoading: true,
        // Comments
        CommentsList: [],
        Total: 0,
        PageSize: 0,
        Page: 1,
        ComLoading: true,
        ComError: "",
        ShowCommentField: false
    }

    static contextType = PostContext

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
            //console.log(this.context)
            this.setState({
                ID: this.context.PostID,
                Title: this.context.PostTitle,
                Author: this.context.PostAuthor,
                Content: this.context.PostContent,
            })
    }

    fetchData = async () => {
        const {Page, ID} = this.state
        try {
            const response = await fetch(`http://localhost:9091/getComments?page=${Page}&post_id=${ID}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json', 
                },
            })

            const textResponse = await response.text(); // Получаем текст ответа
            console.log("Ответ от API (непарсированный):", textResponse);
/*
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
*/
            } catch (error) {
                console.error("Ошибка:", error);
            }
    }

    showComField = () => {
        this.setState({
            ShowCommentField: !this.state.ShowCommentField
        })
    }

    resetPostContext = () => {
        const {setPosID, setTitle, setContent, setAuthor} = this.context
        setPosID("")
        setTitle("")
        setContent("")
        setAuthor("")
    }

    render() {
            const {Content, PostLoading, ComLoading, 
                PostError, ComError, Title, Author, 
                CommentsList, ShowCommentField, showComField, resetPostContext} = this.state;

        //if (PostLoading || ComLoading) {
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
                    <button>Убрать поле</button>
                    <button onClick={showComField}>Отправить</button>
                </>
                : 
                <button onClick={showComField}>Добавить коментарий</button>
                }
                <Comments data={CommentsList}/>
                <Link onClick={resetPostContext} to="/forum"><button>Назад</button></Link>
            </>
        )
    }
}