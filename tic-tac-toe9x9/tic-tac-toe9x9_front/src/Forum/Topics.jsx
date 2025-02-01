import { Component } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App/Context";
import {} from "./Topics.css"

export class Topic extends Component {
    static contextType = AppContext
    setID = () => {
        this.context.setPosID(this.props.topic.id)
    }

    render() {
        const {topic} = this.props

        return ( 
        <>
            <div className="topic">
                {this.context.UserIsCreator === false ? 
                <>
                    <Link to={{pathname: "/topic"}}>
                        <button className="invisible" onClick={this.setID}>{topic.title}</button>
                    </Link>
                    <p>{topic.login}</p>
                </>
                : 
                <>
                    <Link 
                        to={{pathname: "/edit_topic"}}>
                        <button className="invisible" onClick={this.setID}>{topic.title}</button>
                    </Link>
                    <p>{topic.login}</p>
                </>
                }
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