import Home from "@/views/Home.tsx";
import NotFound from "@/components/404.tsx";

export const routerConfig = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/404",
    component: NotFound,
  },
  {
    path: "*",
    component: NotFound,
  },
];
