import { Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import MyBands from "./pages/MyBands";
import Home from "./pages/Home";
import ViewBand from "./pages/ViewBand";
import Profile from "./pages/Profile";
import CreateNewBand from "./pages/CreateNewBand";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/my-bands",
        element: <MyBands />,
      },
      {
        path: "/bands/:id",
        element: <ViewBand />,
      },
      {
        path: "/users/:username",
        element: <Profile />,
      },
      {
        path: "/new-band",
        element: <CreateNewBand />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
];

export default routes;
