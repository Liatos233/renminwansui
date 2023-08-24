import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import style from "./visionHome.module.less"

const VisionHome: React.FC = () => {
  return (
    <div className={style.layout}>
      <div className={style.cardBox}>
        <Card hoverable className={style.cardItem}><Link to="/vision/plants">Earth</Link></Card>
        <Card hoverable className={style.cardItem}><Link to="/vision/solarSystem">Solar System</Link></Card>
        <Card hoverable className={style.cardItem}><Link to="/vision/bookCarousel">BookCarousel</Link></Card>
        <Card hoverable className={style.cardItem}><Link to="/window">Window</Link></Card>
        <Card hoverable className={style.cardItem}><Link to="/musicPlayer">musicPlayer</Link></Card>
      </div>
    </div>
  );
};

export default VisionHome;
