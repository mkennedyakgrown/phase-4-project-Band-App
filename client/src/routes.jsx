import App from "./App";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
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
        path: "/browse",
        element: <Browse />,
      },
    ],
    errorElement: <ErrorPage />,
  },
];

export default routes;
