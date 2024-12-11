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
        //element: <Forum/>
        element: <></>
      },
      {
        path: '/profile',
        element: <Profile/>
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

  return (
  <AppContext.Provider value={{UserIsLoged, UserName, UserAvatarForPanel, UserAvatarForProfile, vinNumber, login, logout, setName, setAvatar, setVins}}>
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </AppContext.Provider>
  )
}

export default App;
