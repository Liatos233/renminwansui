import React from 'react';
import style from './about.module.css';
import NaviBar from '@/components/naviBar/NaviBar';
import MdReader from '@/components/mdReader/mdReader';

const About: React.FC = () => {
  const mdPath = '/resources/about/resume.md';
  return (
    <div className={style.about}>
      <div className={style.container}>
        <MdReader mdPath={mdPath} showContent={false} />
      </div>
      <NaviBar />
    </div>
  )
}
export default About;