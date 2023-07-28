import React from "react";
import { Outlet } from "react-router-dom";
import style from "./vision.module.less";

const Vision: React.FC = () => {
  return (
    <div className={style.layout}>
      <Outlet />
    </div>
  );
};

export default Vision;
