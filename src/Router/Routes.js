import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth";
import Root from "../layouts/Root";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: '/', element: <Root />, children: [
            { path: '/', element: <Home /> },
        ]
    },
    {
        path: '/auth', element: <Auth />, children: [
            { path: '/auth', element: <Login /> },
            { path: '/auth/signup', element: <Signup /> },
        ]
    },
])

export default router;