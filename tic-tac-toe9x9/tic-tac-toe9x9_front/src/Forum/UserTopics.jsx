import { Component } from "react";
import { Link } from "react-router-dom";
import { Topics } from "./Topics";
import { AppContext } from "../App/Context";
import {} from "./Forum.css";
import {} from "./Comments.css"

export class UserTopics extends Component {
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
        //const { Page } = this.state;
        const userLogin = this.context.Login;
    
        try {
            // Сначала получаем количество страниц (или предполагаемое количество страниц)
            const response = await fetch(`http://localhost:9091/getPosts?page=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.context.UserToken}`
                },
            });
            const result = await response.json();
    
            if (result.error !== "") {
                this.setState({ Error: result.error });
            } else {
                // Определяем количество страниц на сервере
                const totalPages = Math.ceil(result.total / 10)
    
                let allPosts = []  // Массив для хранения всех постов
    
                // Перебираем все страницы
                for (let page = 1; page <= totalPages; page++) {
                    const responsePage = await fetch(`http://localhost:9091/getPosts?page=${page}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${this.context.UserToken}`
                        },
                    });
                    const pageResult = await responsePage.json();
    
                    // Фильтруем посты по логину пользователя
                    const userPosts = pageResult.posts.filter(post => post.login === userLogin);
    
                    // Добавляем посты на текущей странице в общий массив
                    allPosts = [...allPosts, ...userPosts]
                }
    
                // Обновляем состояние с объединенными постами
                this.setState({
                    Posts: allPosts,
                    NumberPages: Math.ceil(allPosts.length / 10),
                    Total: allPosts.length,
                    PageSize: result.page_size,
                    Page: 1, // Мы начинаем с первой страницы
                    Error: ""
                })
            }
    
            console.log("Ответ от API:", result)
        } catch (error) {
            console.error("Ошибка:", error)
            this.setState({ Loading: true })
        }
    }

    componentDidMount() {
        this.context.setCreator(true)
        this.fetchData()
        window.addEventListener('keydown', this.KeyClick)
    }

    componentWillUnmount() {
        this.context.setCreator(false)
        window.removeEventListener('keydown', this.KeyClick)
    }

    toNextPage = () => {
        const { Page, NumberPages } = this.state
        if (Page < NumberPages) {
            this.setState(
                (prevState) => ({ Page: prevState.Page + 1 }),
                () => { this.fetchData() }
            );
        }
    };

    toPrevPage = () => {
        const { Page } = this.state
        if (Page > 1) {
            this.setState(
                (prevState) => ({ Page: prevState.Page - 1 }),
                () => {this.fetchData()}
            );
        }
    };

    KeyClick = (e) => {
        if (e.key === 'ArrowLeft') {
            this.toPrevPage()
        } else if (e.key === 'ArrowRight') {
            this.toNextPage()
        }
    };

    render() {
        const { Posts, Page, NumberPages, Loading, Error } = this.state

        if (Loading) {
            return <p>Загрузка...</p>
        }

        if (Error !== "") {
            return <p>Ошибка: {Error}</p>
        }

        return (
            <div className="m-plus-rounded-1c-regular">
                <div className="top_block">
                    <h1 style={{color: '#6a5acd'}}>Ваши темы для обсуждений</h1>
                    {Posts.length > 0 && 
                        <div style={{color: '#6a5acd'}}>
                            <div className="pages_clicker">
                                <button 
                                    onClick={this.toPrevPage} 
                                    disabled={Page === 1}
                                >
                                    {'<'}
                                </button>
                                <button 
                                    onClick={this.toNextPage}
                                    disabled={Page === NumberPages}
                                >
                                    {'>'}
                                </button>
                                <span>{Page} из {NumberPages}</span>
                            </div>
                        </div>
                    }
                </div>
                <div className="list">
                    {Posts.length > 0 ? (
                        <>
                            <p>Какое обсуждение будем редактировать? {"( "}всего {Posts.length} обсуждений{" )"}</p>
                            <Topics data={Posts}/>
                        </>
                    ) : (
                        <p>У вас пока нет созданных обсуждений</p>
                    )}
                </div>
                <Link to="/forum"><button>Назад</button></Link>
            </div>
        )
    }
} 
