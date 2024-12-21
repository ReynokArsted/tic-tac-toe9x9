import { Component } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../Context";

export class Topic extends Component {
    static contextType = AppContext
    state = {
        Title : "",
        Content : "",
        Author : "",
        ID : ""
    }

    setPostContext = (title, content, author, id) => {
        this.context.setTitle(title)
        this.context.setContent(content)
        this.context.setAuthor(author)
        this.context.setPosID(id)
        console.log("id in setPosCon " + id)
    }
    render() {
        const {topic} = this.props
        //console.log(topic.id)

        return ( 
        <>
            <div className="topic">
                <Link 
                onClick={this.setPostContext(topic.title, topic.content, topic.author, topic.id)} 
                to={{pathname: "/topic"}}>
                    {topic.title}
                </Link>
                <p>{topic.login}</p>
            </div>
        </>
        )
    }
}

export class Topics extends Component {
    render() {
        const {data} = this.props
        if (!Array.isArray(data)) {
            return <p>Нет доступных тем</p>;
        }
        return (
            <>
                <div className="list">
                {data.map((topic) => (
                    <Topic key={topic.id} topic={topic}/>
                ))}
                </div>
            </>
        );
    }
}