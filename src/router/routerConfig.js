import { Navigate } from "react-router-dom";

import BasicLayout from "@/layout/BasicLayout";

import Home from "@/views/home/Home";
import Read from "@/views/read/Read";
import Blog from "@/views/blog/Blog";
import About from "@/views/about/About";
import ReadBook from "@/views/readBook/ReadBook";
import Vision from "@/views/vision/Vision";
import VisionHome from "./../views/vision/visionHome/VisionHome";
import SolarSystem from "@/components/plants/SolarSystem";
import BookCarousel from "@/components/bookCarousel/BookCarousel";
import Plants from "@/components/plants/Plants";
import Window from "@/views/window/Window";
import MusicPlayer from "@/views/musicPlayer/MusicPlayer";

export const routerConfig = [
  {
    path: "/",
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
        path: "read",
        element: <Read />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "vision",
        element: <Vision />,
        children: [
          {
            path: "",
            element: <VisionHome />,
          },
          {
            path: "plants",
            element: <Plants />,
          },
          {
            path: "solarSystem",
            element: <SolarSystem />,
          },
          {
            path: "bookCarousel",
            element: <BookCarousel />,
          },
        ],
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
        path: "window",
        element: <Window />,
      },
      {
        path: "musicPlayer",
        element: <MusicPlayer />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
