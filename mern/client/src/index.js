import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { LogIn } from "./components/authPages/login/login";
import { Register } from "./components/authPages/register/register";

import ErrorPage from "./components/errorpage";
import { Board } from "./components/discussionBoard/board";
import { Welcome } from "./components/discussionBoard/welcome";
import { TestPage } from "./components/testPg";
import { YourPosts} from "./components/discussionBoard/yourPosts"


const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users",
    element : <Welcome/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/board",
    element : <Board/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/users/history",
    element : <YourPosts/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/test",
    element : <TestPage/>,
    errorElement: <ErrorPage />,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
