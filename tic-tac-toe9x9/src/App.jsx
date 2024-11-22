import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { Panel } from "./Panel";
import { Field } from "./PlayField";
import { SignUp } from './sign_up';

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
  var userLog = false

  if (userLog === false) {
    return (
      <div className="App">
        <RouterProvider router={router}></RouterProvider>
      </div>
    )
  } else {
    return (
      <div className="App">
      </div>
    )
  }
}

export default App;
