import { Component } from "react";
import { Topics } from "../Topics";

export class EditTopic extends Component {
    state = {
        UserTopics: [],
        Loading: true,
        Error: false
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
        const {Loading, Error, UserTopics} = this.state

        if (Loading) {
            return <p>Загрузка...</p>;
        }

        if (Error) {
            return <p>Ошибка: {Error}</p>;
        }

        return(
            <>
                <h1>Ваши публикации</h1>
                <Topics data={UserTopics}/>
            </>
        )
    }
}