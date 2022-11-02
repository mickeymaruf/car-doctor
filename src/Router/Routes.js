import { createBrowserRouter } from "react-router-dom";
import Auth from "../layouts/Auth";
import Root from "../layouts/Root";
import Login from "../Pages/Auth/Login";
import Signup from "../Pages/Auth/Signup";
import Checkout from "../Pages/Checkout/Checkout";
import Home from "../Pages/Home/Home";
import Orders from "../Pages/Orders/Orders";

const router = createBrowserRouter([
    {
        path: '/', element: <Root />, children: [
            { path: '/', element: <Home /> },
            { path: 'checkout/:_id', element: <Checkout />, loader: ({ params }) => fetch(`http://localhost:5000/services/${params._id}`) },
            { path: 'orders', element: <Orders />}
        ]
    },
    {
        path: 'auth', element: <Auth />, children: [
            { path: '/auth', element: <Login /> },
            { path: '/auth/signup', element: <Signup /> },
        ]
    },
])

export default router;