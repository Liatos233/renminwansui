import { Navigate } from "react-router-dom";

import HomeLayout from "@/layout/HomeLayout";

import Home from "@/views/home/Home";
import User from "@/views/user/User";
import About from "@/views/about/About";
import ReadBook from "@/views/readBook/ReadBook";

export const routerConfig = [
  {
    path: "*",
    element: <HomeLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "user",
        element: <User />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "readBook",
        element: <ReadBook />,
      },
      // 其他子路由...
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
