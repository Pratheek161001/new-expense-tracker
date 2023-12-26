import './App.css';
import Login from './components/LoginSignUp';
import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import MainPage from './components/MainPage';
import Profile from './components/Profile';
import SideCrumbs from './components/SideCrumbs';

const router=createBrowserRouter([
  {path:'/',element:<Login/>},
  {path:'/mainbody',element:<MainPage/>},
  {path:'/profile',element:<Profile/>},
  {path:'/alert',element:<SideCrumbs/>},
])

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
