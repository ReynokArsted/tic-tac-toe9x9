import { Component } from "react";
import { Link } from "react-router-dom";
//import { AppContext } from "../Context";
import { Topics } from "./Topics";
//import { da } from "date-fns/locale";

export class Forum extends Component {
    state = {
        TopicsList: 
        [
            {id : 1, name: 'first topic', data: '14.12.2024'},
            {id : 2, name: 'second topic', data: '14.12.2024'}
        ],
        Loading: false,
        Error: null
    }

    //componentDidMount() {
        /*
        fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/list')
                if (!response.ok) {
                    throw new Error("Ошибка загрузки данных")
                }
                const result = await response.json()
                this.setState({ 
                    Topics: result, 
                    Loading: false 
                });
            } 
            catch (error) {
                this.setState({ 
                    Error: error.message, 
                    Loading: false 
                })
            }
        }
        */
    //}

    render() {
        const {TopicsList, Loading, Error} = this.state;

        if (Loading) {
            return <p>Загрузка...</p>;
        }

        if (Error) {
            return <p>Ошибка: {Error}</p>;
        }

        return (
            <>
                <h1>Темы для обсуждений</h1>
                <Link to="/new_topic"><button>Создать новое обсуждение</button></Link>
                <Link to="/edit_topic"><button>Редактировать созданные обсуждения</button></Link>
                <div className="list">
                <Topics data={TopicsList}/>
                </div>
            </>
        );
        
    }
}