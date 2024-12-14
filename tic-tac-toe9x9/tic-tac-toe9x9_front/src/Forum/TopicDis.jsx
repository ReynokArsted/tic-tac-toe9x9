import { Component } from "react";
import { Comments } from "./Comments";

export class TopicDis extends Component {
    state = {
        // text: [],
        Text: "текст",
        Loading: false,
        Error: null,
        ID: null,
        //name: null
        Name: "Какая-то тема",
        CommentsList: [
            {id: 1, text: 'hello', author: 'fss'},
            {id: 2, text: 'gsg', author: 'fss'}
        ]
    }

    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        //const Location = useLocation()
        //const {id, name} = Location.state
        /*
        try {
            const response = await fetch('https://api.example.com/text');
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных")
            }
            const result = await response.json()
            this.setState({ 
                data: result, 
                loading: false,
                id: id,
                name: name
            })
        } 
        catch (error) {
            this.setState({ 
                error: error.message, 
                loading: false 
            })
        }
        */
    }
    

    render() {
        const {Text, Loading, Error, Name, CommentsList} = this.state;

        if (Loading) {
            return <p>Загрузка...</p>;
        }

        if (Error) {
            return <p>Ошибка: {Error}</p>;
        }

        return (
            <>
                <h1>{Name}</h1>
                <div className="text">
                    {Text}
                </div>
                <button>Добавить коментарий</button>
                <Comments data={CommentsList}/>
            </>
        )
    }
}