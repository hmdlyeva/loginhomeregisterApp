import DetailUser from "../component/DetailUserPage/DetailUser";
import NotificationPage from "../component/HomePages/notificationPage/NotificationPage";
import DirectPage from "../component/directPage/DirectPage";
import LoginPage from "../component/login/LoginPage";
import ProfilePage from "../component/profilePage/ProfilePage";
import RegisterPage from "../component/register/RegisterPage";
import SearchPage from "../component/searchPage/SearchPage";
import SendPostPage from "../component/sendPostPage/SendPostPage";
import HomePage from "../pages/HomePage/HomePage";

export const routes = [
    {
        path: "/",
        element: <HomePage/>,
    },
    {
        path: "/login",
        element: <LoginPage name={""} surname={""} username={""} email={""} password={""} number={""} />,
    },
    {
        path: "/register",
        element: <RegisterPage name={""} surname={""} username={""} email={""} password={""} number={""} />,
    },
    {
        path: "/searchpage",
        element: <SearchPage/>,
    },
    {
        path: "/directpage",
        element: <DirectPage/>,
    },
    {
        path: "/sendposterspage",
        element: <SendPostPage/>,
    },
    {
        path: "/profilepageuser",
        element: <ProfilePage username={""} profileimg={""} bio={""} info={""}/>,
    },
    {
        path: "/detailuserpage/:username",
        element: <DetailUser/>,
    },
    {
        path: "/notificationuserpage",
        element: <NotificationPage/>,
    },
    {
        path: "*",
        element: <div>Error Page</div>,
    },
];

