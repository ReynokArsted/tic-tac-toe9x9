import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AvatarForPanel from "../images/avatar24.png"
import AvatarForProfile from "../images/avatar100.png" 
import { Panel } from "../Panel/Panel";
import { MainPage } from "../MainPage/MainPage";
import { SignUp } from '../SignUp/sign_up';
import { SignIn } from '../SignIn/sign_in';
import { AppContext} from './Context';
import { useState } from 'react';
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
  const [UserToken, setUserToken] = useState("")

  const [PostID, setPostID] = useState(0)
  const [UserIsCreator, setUserState] = useState(false)
  const [IsUpdate, setUpdate] = useState(false)

  const login = (data) => {
    setUserIsLoged(true)
    setLogin(data.login)
    setName(data.username)
    setPassword(data.password)
    setWins(data.win)
    setLoses(data.lose)
    setToken(data.jwttoken)
  }

  const logout = () => {
    setUserIsLoged(false)
    setLogin("")
    setName("")
    setPassword("")
    setWins(0)
    setLoses(0)
    setToken("")
  }

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

  const setToken = (token) => {
    setUserToken(token)
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

  return (
  <AppContext.Provider value={
    {UserIsLoged, Login, UserName, Password, UserAvatarForPanel, 
    UserAvatarForProfile, Wins, Loses, UserToken, login, 
    logout, setName, setLogin, setPassword, setAvatar, 
    setWins, setLoses, setToken, PostID, setPosID, 
    UserIsCreator, setCreator, IsUpdate, Update
    }}>
        <div className="App">
          <RouterProvider router={router}></RouterProvider>
        </div>
  </AppContext.Provider>
  )
}

export default App;
