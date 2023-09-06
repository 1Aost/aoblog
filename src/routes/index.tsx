import { lazy } from "react";
import {Navigate} from "react-router-dom"
import NotFound from "../components/NotFound";
import MineChange from "../pages/Main/MineChange";
import MineComments from "../pages/Main/MineComments";
import MineLikes from "../pages/Main/MineLikes";

const Home = lazy(()=>import("../pages/Main/Home/index")); 
const Content = lazy(()=>import("../pages/Main/Content"));
const Login = lazy(()=>import("../pages/Login"));
const Register = lazy(()=>import("../pages/Register"));
const MessageBoard = lazy(()=>import("../pages/Main/MessageBoard"));
const Process = lazy(()=>import("../pages/Main/Process"));
const Feeling = lazy(()=>import("../pages/Main/Feeling"));
const About = lazy(()=>import("../pages/Main/About"));
const Mine = lazy(()=>import("../pages/Main/Mine"));
const MineMessage = lazy(()=>import("../pages/Main/MineMessage"))
const routes=[
    {
        path:"/",
        element: <Navigate to="/home"></Navigate>,
    },
    {
        path:"/home",
        element: <Home></Home>
    },
    {
        path:"/content/:id",
        element: <Content></Content>
    },
    {
        path:"/login",
        element: <Login></Login>
    },
    {
        path:"/register",
        element: <Register></Register>
    },
    {
        path:"/board",
        element: <MessageBoard></MessageBoard>
    },
    {
        path:"/process",
        element: <Process></Process>
    },
    {
        path:"/feeling",
        element: <Feeling></Feeling>
    },
    {
        path:"/about",
        element: <About></About>
    },
    {
        path:"/mine",
        element: <Mine></Mine>,
        children:[
            {
                path:"message",
                element: <MineMessage></MineMessage>
            },
            {
                path:"comment",
                element: <MineComments></MineComments>
            },
            {
                path:"liked",
                element: <MineLikes></MineLikes>
            }
        ]
    },
    {
        path:"change",
        element: <MineChange></MineChange>
    },
    {
        path:"/*",
        element: <NotFound></NotFound>
    },
]
export default routes;