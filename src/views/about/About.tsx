import React from 'react';
import style from './about.module.css';
import NaviBar from '@/components/naviBar/NaviBar';

const About: React.FC = () => {
  return (
    <div className={style.about}>
      About
      <NaviBar />
    </div>
  )
}
export default About;