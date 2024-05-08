import App from "./App";
import Login from "./pages/Login";
import MyBands from "./pages/MyBands";
import Home from "./pages/Home";
import ViewBand from "./pages/ViewBand";
import ManageBand from "./pages/ManageBand";
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
        path: "/my-bands/:id",
        element: <ViewBand />,
      },
      {
        path: "/my-bands/manage/:id",
        element: <ManageBand />,
      },
    ],
  },
];

export default routes;
