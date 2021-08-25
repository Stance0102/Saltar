import Home from "./Home/Home";
import SignIn from "./Account/SignIn";
import Management from "./Ticket/Management";
import Add from "./Ticket/TicketType";
import MemberList from "./Ticket/MemberList";
import Edit from "./Account/Edit";
import Show from "./Activity/Show";

let routes = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/signin",
        component: SignIn,
    },
    {
        path: "/account/edit",
        component: Edit,
    },
    {
        path: "/activity/show",
        component: Show,
    },
    {
        path: "/ticket/management",
        component: Management,
        exact: true,
    },
    {
        path: "/ticket/management/add",
        component: Add,
    },
    {
        path: "/ticket/management/memberList",
        component: MemberList,
    },
];

export default routes;
