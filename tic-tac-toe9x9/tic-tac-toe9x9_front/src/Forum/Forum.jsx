import { Component } from "react";
import { Link } from "react-router-dom";
import { Topics } from "./Topics";
import { AppContext } from "../App/Context";
import {} from "./Forum.css"
import {} from "./Comments.css"

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
                this.setState({Loading: true});
            }
    }

    componentDidMount() {
        this.fetchData()
        window.addEventListener('keydown', this.KeyClick)
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.KeyClick)
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

    KeyClick = (e) => {
        if (e.key === 'ArrowLeft') {
            this.toPrevPage();
        } else if (e.key === 'ArrowRight') {
            this.toNextPage();
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
            <div className="m-plus-rounded-1c-regular">
                <div className="top_block">
                    <h1 className="forum_text">Темы для обсуждений</h1>
                    <div className="forum_text pages_clicker">
                        <button  onClick={this.toPrevPage} disabled={Page === 1}>
                            {'<'}
                        </button>
                        <button onClick={this.toNextPage} disabled={Page === NumberPages}>
                            {'>'}
                        </button>
                        <span>{Page} из {NumberPages} </span>
                    </div>
                </div>
                {this.context.UserIsLoged === true && 
                <div className="forum_text">
                <Link to="/new_topic"><button>Создать новое обсуждение</button></Link>
                <Link to="/user_topics"><button>Редактировать созданные обсуждения</button></Link>
                </div>
                }
                <div className="list">
                <Topics data={Posts}/>
                </div>
            </div>
        );
        
    }
}