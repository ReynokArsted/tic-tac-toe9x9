import { Component } from "react";
import { AppContext } from "../App/Context";
import {} from "./Comments.css"

export class Comment extends Component {
    static contextType = AppContext
    state = {
        Error: "",
        ShowDeleteWarning: false,
        CommentToDelete: null
    }
    

    DeleteComment = async (id) => {
        try {
            const response = await fetch(`http://localhost:9091/deleteCommentById?comment_id=${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${this.context.UserToken}`
                }
            })
            const result = await response.json()
            if (result.error !== "") {
                this.setState({Error : result.error})
            } else {
                this.setState({
                })
            }
            console.log("Ответ от API: ", result)
        }
        catch(error) {
            console.error("Ошибка: ", error)
        }
    }

    showDeleteWarning = (id) => {
        this.setState({
            ShowDeleteWarning: true,
            CommentToDelete: id
        })
    }

    confirmDeleteComment = async () => {
        const { CommentToDelete } = this.state
        await this.DeleteComment(CommentToDelete)
        this.setState({ ShowDeleteWarning: false, CommentToDelete: null })

        if (this.props.onUpdate) {
            this.props.onUpdate()
        }
    }

    cancelDeleteComment = () => {
        this.setState({
            ShowDeleteWarning: false,
            CommentToDelete: null
        })
    }

    DeleteCommentButton = async (id) => {
        await this.DeleteComment(id)
        if (this.props.onUpdate) {
            this.props.onUpdate()
        }
    }

    render() {
        const {comment, id} = this.props
        return(
            <div className="comment">
                <p>{comment.content}</p>
                <p>Автор: {comment.login}</p>
                {comment.login === this.context.Login &&
                    <button onClick={() => this.showDeleteWarning(id)}>
                        Удалить комментарий
                    </button>
                }
                {this.state.ShowDeleteWarning && (
                    <div className="background">
                        <div className="warning m-plus-rounded-1c-regular">
                            <p>Комментарий будет удалён безвозвратно<br></br>Продолжить?</p>
                            <button 
                                onClick={this.confirmDeleteComment} 
                                style={{ marginRight: '10px' }}>
                                Да
                            </button>
                            <button onClick={this.cancelDeleteComment}>
                                Нет
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export class Comments extends Component {
    render() {
        const {data} = this.props
        return(
            <>
                <p>Комментарии:</p>
                <div className="list">
                {data.map((comment) => (
                    <Comment 
                        key={comment.id} 
                        comment={comment} 
                        id={comment.comment_id}
                        onUpdate={this.props.onUpdate}
                    />
                ))}
                </div> 
            </>
        )
    }
}