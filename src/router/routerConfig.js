import { Navigate } from "react-router-dom";

import BasicLayout from "@/layout/BasicLayout";

import Home from "@/views/home/Home";
import Blog from "@/views/blog/Blog";
import About from "@/views/about/About";
import ReadBook from "@/views/readBook/ReadBook";

export const routerConfig = [
  {
    path: "/*",
    element: <BasicLayout />,
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
        path: "blog",
        element: <Blog />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "readBook",
        element: <ReadBook />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
