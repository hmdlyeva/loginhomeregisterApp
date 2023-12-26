import LoginPage from "../component/login/LoginPage";
import RegisterPage from "../component/register/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";

export const routes = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "*",
        element: <div>Error Page</div>,
    },
];