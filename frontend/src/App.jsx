import React from 'react'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import 'line-awesome/dist/line-awesome/css/line-awesome.css';


// sidebar later
const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />, 
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
]);


function App() {

  return (
       <RouterProvider router={router} />

  )
}

export default App
