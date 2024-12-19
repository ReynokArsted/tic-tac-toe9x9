import { Component } from "react";
import { Link } from "react-router-dom";
import { Topics } from "./Topics";

export class Forum extends Component {
    state = {
        Posts: [],
        Total: 0,
        PageSize: 0,
        Page: 1,
        Loading: false,
        Error: ""
    }

    fetchData = async () => {
        const {Page} = this.state
        try {
            const response = await fetch(`http://localhost:9091/getPosts?page=${Page}`, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json', 
                },
            })
            const result = await response.json()
            if (result.error !== "") {
                this.setState({Error : result.error})
            } else {
                this.setState({
                    Posts: result.posts,
                    Total: result.total,
                    PageSize: result.page_size,
                    Page: result.page,
                    Error: ""
                })
            }
            console.log("Ответ от API:", result);
            } catch (error) {
                console.error("Ошибка:", error);
            }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        const {Posts, Loading, Error} = this.state;

        if (Loading === true) {
            return <p>Загрузка...</p>;
        }

        if (Error !== "") {
            return <p>Ошибка: {Error}</p>;
        }

        return (
            <>
                <h1>Темы для обсуждений</h1>
                <Link to="/new_topic"><button>Создать новое обсуждение</button></Link>
                <Link to="/edit_topic"><button>Редактировать созданные обсуждения</button></Link>
                <div className="list">
                <Topics data={Posts}/>
                </div>
            </>
        );
        
    }
}