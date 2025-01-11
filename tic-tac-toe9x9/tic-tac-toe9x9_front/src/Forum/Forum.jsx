import { Component } from "react";
import { Link } from "react-router-dom";
import { Topics } from "./Topics";
import { AppContext } from "../Context";

export class Forum extends Component {
    state = {
        Posts: [],
        NumberPages: 0,
        Total: 0,
        PageSize: 0,
        Page: 1,
        Loading: false,
        Error: ""
    }

    static contextType = AppContext

    fetchData = async () => {
        const {Page} = this.state
        //this.setState({ Loading: true });
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
                    NumberPages: Math.ceil(result.total / 10),
                    Total: result.total,
                    PageSize: result.page_size,
                    Page: result.page,
                    Error: ""
                })
            }
            console.log("Ответ от API:", result);
            } catch (error) {
                console.error("Ошибка:", error);
                this.setState({ Loading: false });
            }
    }

    componentDidMount() {
        this.fetchData()
    }

    toNextPage = () => {
        const { Page, NumberPages } = this.state;

        if (Page < NumberPages) {
            this.setState(
                (prevState) => ({ Page: prevState.Page + 1 }), () => {this.fetchData()})
            }
    }

    toPrevPage = () => {
        const { Page } = this.state

        if (Page > 1) {
            this.setState(
                (prevState) => ({ Page: prevState.Page - 1 }), () => {this.fetchData()})
            }
    }

    render() {
        const {Posts, Page, NumberPages, Loading, Error} = this.state;

        if (Loading === true) {
            return <p>Загрузка...</p>;
        }

        if (Error !== "") {
            return <p>Ошибка: {Error}</p>;
        }

        return (
            <>
                <h1>Темы для обсуждений</h1>
                {this.context.UserIsLoged === true && 
                <>
                <Link to="/new_topic"><button>Создать новое обсуждение</button></Link>
                <Link to="/edit_topic"><button>Редактировать созданные обсуждения</button></Link>
                </>
                }
                <div className="list">
                <Topics data={Posts}/>
                </div>
                <div>
                    <button onClick={this.toPrevPage} disabled={Page === 1}>
                        Назад
                    </button>
                    <span> Страница {Page} из {NumberPages} </span>
                    <button onClick={this.toNextPage} disabled={Page === NumberPages}>
                        Вперёд
                    </button>
                </div>
            </>
        );
        
    }
}