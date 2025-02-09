import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AvatarForPanel from "../images/avatar24.png"
import AvatarForProfile from "../images/avatar100.png" 
import { Panel } from "../Panel/Panel";
import { MainPage } from "../MainPage/MainPage";
import { SignUp } from '../SignUp/sign_up';
import { SignIn } from '../SignIn/sign_in';
import { AppContext} from './Context';
import { useState, useEffect, useCallback } from 'react';
import { Profile } from '../Profile/Profile';
import { Forum } from '../Forum/Forum';
import { TopicDis } from '../Forum/TopicDis';
import { NewTopic } from '../Forum/NewTopic';
import { GameRules } from '../GameRules/GameRules';
import { UserTopics } from '../Forum/UserTopics';
import { Game } from '../Game/Game';
import { EditTopic } from '../Forum/EditTopic';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Panel/>,
    children: [
      {
        path: '/',
        element: <MainPage/>
      },
      {
        path: '/game_rules',
        element: <GameRules/>
      },
      {
        path: '/sign_up',
        element: <SignUp/>
      },
      {
        path: '/sign_in',
        element: <SignIn/>
      },
      {
        path: '/game',
        element: <Game/>
      },
      {
        path: '/forum',
        element: <Forum/>
      },
      {
        path: '/profile',
        element: <Profile/>
      },
      {
        path: '/topic',
        element: <TopicDis/>
      },
      {
        path: '/new_topic',
        element: <NewTopic/>
      },
      {
        path: '/user_topics',
        element: <UserTopics/>
      },
      {
        path: '/edit_topic',
        element: <EditTopic/>
      }
    ]
  }
])

function App() {
  // AppContext
  const [UserIsLoged, setUserIsLoged] = useState(false)
  const [Login, setUserLogin] = useState("")
  const [UserName, setUserName] = useState("")
  const [Password, setUserPassword] = useState("")
  const [UserAvatarForPanel, setUserAvatarForPanel] = useState(AvatarForPanel)
  const [UserAvatarForProfile, setUserAvatarForProfile] = useState(AvatarForProfile)
  const [Wins, setWinsNumber] = useState(0)
  const [Loses, setLosesNumber] = useState(0)
  const [loading, setLoading] = useState(true)

  const [PostID, setPostID] = useState(0)
  const [UserIsCreator, setUserState] = useState(false)
  const [IsUpdate, setUpdate] = useState(false)

  const setLogin = (userlogin) => {
    setUserLogin(userlogin)
  }

  const setName = (name) => {
    setUserName(name)
  }

  const setPassword = (pass) => {
    setUserPassword(pass)
  }

  const setAvatar = (path) => {
    setUserAvatarForPanel(path)
    setUserAvatarForProfile(path)
  }

  const setWins = (number) => {
    setWinsNumber(number)
  }

  const setLoses = (number) => {
    setLosesNumber(number)
  }

  const setPosID = (id) => {
    setPostID(id)
  }

  const setCreator = (state) => {
    setUserState(state)
  }

  const Update = () => {
    setUpdate(!IsUpdate)
  }

  const login = useCallback((data) => {
    setUserIsLoged(true);
    setLogin(data.login);
    setName(data.username);
    setPassword(data.password);
    setWins(data.win);
    setLoses(data.lose);
  }, []); 

  const logout = () => {
    setUserIsLoged(false)
    setLogin("")
    setName("")
    setPassword("")
    setWins(0)
    setLoses(0)
  }

  useEffect(() => {
    fetch("http://localhost:9090/stayAuth", {
      method: "GET",
      credentials: "include"
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error("Unauthorized")
        }
      })
      .then(data => {
        login(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Ошибка авторизации:", error);
        setLoading(false);
      });
  }, [login]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
  <AppContext.Provider value={
    {UserIsLoged, Login, UserName, Password, UserAvatarForPanel, 
    UserAvatarForProfile, Wins, Loses, login, 
    logout, setName, setLogin, setPassword, setAvatar, 
    setWins, setLoses, PostID, setPosID, 
    UserIsCreator, setCreator, IsUpdate, Update
    }}>
        <div className="App">
          <RouterProvider router={router}></RouterProvider>
        </div>
  </AppContext.Provider>
  )
}

export default App;
