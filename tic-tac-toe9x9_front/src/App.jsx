import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import AvatarForPanel from "./images/avatar24.png"
import AvatarForProfile from "./images/avatar100.png" 
import { Panel } from "./Panel";
import { MainPage } from "./main_page";
import { SignUp } from './sign_up';
import { SignIn } from './sign_in';
import { AppContext } from './Context';
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
  const [UserIsLoged, setUserIsLoged] = useState(false)
  const [UserName, setUserName] = useState("nameless")
  const [UserAvatarForPanel, setUserAvatarForPanel] = useState(AvatarForPanel)
  const [UserAvatarForProfile, setUserAvatarForProfile] = useState(AvatarForProfile)
  const [vinNumber, setVinNumber] = useState(0)
  //const [Posts, setUserPosts] = useState(null)

  const login = () => {
    setUserIsLoged(true)

  }

  const logout = () => {
    setUserIsLoged(false)
  }

  const setName = (name) => {
    setUserName(name)
  }

  const setAvatar = (path) => { // Как сохранить аватар, который загружает пользователь?
    setUserAvatarForPanel(path)
    setUserAvatarForProfile(path)
  }

  const setVins = (number) => {
    setVinNumber(number)
  }

  //const setPosts = (list) => {
  //  setUserPosts(list)
  //}

  return (
  <AppContext.Provider value={{UserIsLoged, UserName, UserAvatarForPanel, UserAvatarForProfile, vinNumber, login, logout, setName, setAvatar, setVins}}>
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </AppContext.Provider>
  )
}

export default App;
