import App from "./App";
import Login from "./pages/Login";
import MyBands from "./pages/MyBands";
import Home from "./pages/Home";
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
    ],
  },
];

export default routes;
