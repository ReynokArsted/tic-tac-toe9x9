import { Component } from "react";
import { Comments } from "./Comments";
import { PostContext } from "../Context";
import { Link } from "react-router-dom";

export class TopicDis extends Component {
    state = {
        ID: "",
        Title: "",
        Content: "",
        Author: "",
        Error: "",
        Loading: false,
        CommentsList: []
    }

    static contextType = PostContext

    componentDidMount() {
        this.updateData()
    }

    componentWillUnmount() {
        const {setPosID, setTitle, setContent, setAuthor} = this.context
        setPosID("")
        setTitle("")
        setContent("")
        setAuthor("")
    }

    updateData = () => {
            console.log(this.context)
            this.setState({
                ID: this.context.PostID,
                Title: this.context.PostTitle,
                Author: this.context.PostAuthor,
                Content: this.context.PostContent,
            })
    }

    render() {
            const {Content, Loading, Error, Title, Author, CommentsList} = this.state;

        if (Loading) {
            return <p>Загрузка...</p>;
        }

        if (Error) {
            return <p>Ошибка: {Error}</p>;
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
                <button>Добавить коментарий</button>
                <Comments data={CommentsList}/>
                <Link to="/forum"><button>Назад</button></Link>
            </>
        )
    }
}