import { Navigate } from "react-router-dom";
import user from "./App";
import App from "./App";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import MyBands from "./pages/MyBands";
import Home from "./pages/Home";
import ViewBand from "./pages/ViewBand";
import ManageBand from "./pages/ManageBand";
import ManageProfile from "./pages/ManageProfile";
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
        element: user != [] ? <Home /> : <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: user != [] ? <Navigate to="/" /> : <Login />,
      },
      {
        path: "/logout",
        element: user != [] ? <Logout /> : <Navigate to="/login" />,
      },
      {
        path: "/my-bands",
        element: <MyBands />,
      },
      {
        path: "/my-bands/:id",
        element: <ViewBand />,
      },
      {
        path: "/my-bands/manage/:id",
        element: <ManageBand />,
      },
      {
        path: "/users/:id",
        element: <ManageProfile />,
      },
      {
        path: "/new-band",
        element: <CreateNewBand />,
      },
    ],
  },
];

export default routes;
