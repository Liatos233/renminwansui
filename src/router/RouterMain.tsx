import React from "react";
import { useRoutes } from "react-router-dom";
import { routerConfig } from "./routerConfig";

const RouterMain: React.FC = () => {
  const routing = useRoutes(routerConfig);
  return (
    <>
      {routing}
    </>
  );
};

export default RouterMain;
