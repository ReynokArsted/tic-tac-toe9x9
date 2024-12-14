import { Component } from "react";
import { Link } from "react-router-dom";

export class Topic extends Component {
    render() {
        const {topic} = this.props
        return (
        <div className="topic">
            <Link to={{
                pathname: "/topic",
                state : {id: topic.id, name: topic.name}
            }}>
                {topic.name}
            </Link>
            <p>Тема ...</p>
        </div>
        );
    }
}

export class Topics extends Component {
    render() {
        const {data} = this.props
        if (!Array.isArray(data)) {
            return <p>Нет доступных тем.</p>;
        }
        return (
            <>
                <div className="list">
                {data.map((topic) => (
                    <Topic key={topic.id} topic={topic} />
                ))}
                </div>
            </>
        );
    }
}