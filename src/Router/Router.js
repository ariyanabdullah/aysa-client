import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import LogIn from "../Pages/LogIn/LogIn";
import Register from "../Pages/Register/Register";
import Media from "../Pages/Media/Media";
import Message from "../Pages/Message/Message";
import PrivateRoute from "./PrivateRoute";
import RegisterLayout from "../Layout/RegisterLayout";
import PostDetails from "../Pages/PostDetails/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home></Home>
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <PrivateRoute>
            <About></About>
          </PrivateRoute>
        ),
      },
      // {
      //   path: "/login",
      //   element: <LogIn></LogIn>,
      // },
      // {
      //   path: "/register",
      //   element: <Register></Register>,
      // },
      {
        path: "/media",
        element: (
          <PrivateRoute>
            <Media></Media>
          </PrivateRoute>
        ),
      },
      {
        path: "/message",
        element: (
          <PrivateRoute>
            <Message></Message>
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(
            `https://social-media-server-dun.vercel.app/singlePost/${params.id}`
          ),
        element: <PostDetails></PostDetails>,
      },
    ],
  },
  {
    path: "/login",
    element: <RegisterLayout></RegisterLayout>,
    children: [
      {
        path: "/login",
        element: <LogIn></LogIn>,
      },
      {
        path: "/login/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
