import { Component } from "react";
//import { useLocation } from "react-router-dom";

export class Comment extends Component {
    render() {
        const {comment} = this.props
        return(
            <>
                <p>{comment.text}</p>
                <p>{comment.author}</p>
            </>
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
                    <Comment key={comment.id} comment={comment} />
                ))}
                </div> 
            </>

        )
    }
}