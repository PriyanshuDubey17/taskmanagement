import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import AllTasks from "./components/AllTasks";
import EditTask from "./components/EditTask";
import AddTask from "./components/AddTask";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },

  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    element: <SignUpPage />,
  },

  {
    path: "/layout",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: "tasks", element: <AllTasks /> },
      { path: "edit-task/:id", element: <EditTask /> },
      { path: "add-task", element: <AddTask /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
