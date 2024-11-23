import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Panel } from "./Panel";
import { Field } from "./PlayField";
import { SignUp } from './sign_up';
import { AppContext } from './Context';
import {useState } from 'react';
import AvatarPath from './images/avatar24.png' 


const router = createBrowserRouter([
  {
    path: '/',
    element: <Panel/>,
    children: [
      {
        path: '/',
        element: <Field/>
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
        //element: <SignIn/>
        element: <></>
      },
      {
        path: '/game',
        //element: <PlayField/>
        element: <></>
      },
      {
        path: '/forum',
        //element: <Forum/>
        element: <></>
      },
      {
        path: '/profile',
        element: <></>
      }
    ]
  }
])

function App() {
  const [UserIsLoged, setUserIsLoged] = useState(false)
  const [UserName, setUserName] = useState("nameless")
  const [UserAvatar, setUserAvatar] = useState(AvatarPath)

  const login = () => {
    setUserIsLoged(true)
  }

  const logout = () => {
    setUserIsLoged(false)
  }

  const setName = (name) => {
    setUserName(name)
  }

  const setAvatar = () => { // Как сохранить аватар, который загружает пользователь?
    setUserAvatar()
  }

  return (
  <AppContext.Provider value={{UserIsLoged, UserName, UserAvatar, login, logout, setName, setAvatar}}>
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  </AppContext.Provider>
  )
}

export default App;
