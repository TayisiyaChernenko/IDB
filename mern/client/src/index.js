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


const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:register",
    element: <Register />,
  },
  {
    path: "/users/board",
    element : <Board/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
