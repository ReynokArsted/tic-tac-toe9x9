import { Component } from "react";
import { Link } from "react-router-dom";

export class Topic extends Component {
    state = {
        Title : "",
        Content : "",
        Author : "",
        ID : ""
    }

    render() {
        const {topic} = this.props
        //console.log(topic.id)

        return ( 
        <>
            <div className="topic">
                <Link 
                to={{pathname: "/topic"}}>
                    {topic.title}
                </Link>
                {/*<Link to={`/topic`} id={topic.id}>{topic.title}</Link>*/}
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