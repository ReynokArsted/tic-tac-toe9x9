import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AvatarForPanel from "./images/avatar24.png"
import AvatarForProfile from "./images/avatar100.png" 
import { Panel } from "./Panel";
import { MainPage } from "./main_page";
import { SignUp } from './sign_up';
import { SignIn } from './sign_in';
import { AppContext, PostContext } from './Context';
import { useState } from 'react';
import { Profile } from './Profile';
import { Board } from './Game';
import { Forum } from './Forum/Forum';
import { TopicDis } from './Forum/TopicDis';
import { NewTopic } from './Forum/NewTopic';
import { EditTopic } from './Forum/EditTopic';

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
        //element: <Rules/>
        element: <></>
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
        element: <Board/>
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

  // PostContext
  const [PostTitle, setPostTitle] = useState("")
  const [PostContent, setPostContent] = useState("")
  const [PostAuthor, setPostAuthor] = useState("")
  const [PostID, setPostID] = useState("")

  const login = (data) => {
    setUserIsLoged(true)
    setLogin(data.login)
    setName(data.username)
    setPassword(data.password)
    setWins(data.win)
    setLoses(data.lose)
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

  const setAvatar = (path) => { // Как сохранить аватар, который загружает пользователь?
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

  const setTitle = (title) => {
    setPostTitle(title)
  }

  const setContent = (content) => {
    setPostContent(content)
  }

  const setAuthor = (author) => {
    setPostAuthor(author)
  }

  const setPosID = (id) => {
    setPostID(id)
  }

  return (
  <AppContext.Provider value={
    {UserIsLoged, Login, UserName, Password, UserAvatarForPanel, 
    UserAvatarForProfile, Wins, Loses, UserToken, login, 
    logout, setName, setLogin, setPassword, setAvatar, 
    setWins, setLoses, setToken 
    }}>
      <PostContext.Provider value={{PostTitle, PostContent, PostAuthor, PostID,
        setTitle, setContent, setAuthor, setPosID}}>
        <div className="App">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </PostContext.Provider>
  </AppContext.Provider>
  )
}

export default App;
