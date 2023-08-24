import React from 'react';
import style from './about.module.less';
import NaviBar from '@/components/naviBar/NaviBar';
import MdReader from '@/components/mdReader/MdReader';

const About: React.FC = () => {
  const mdPath = require('@/assets/about/resume.md');
  return (
    <div className={style.about}>
      <div className={style.container}>
        <MdReader filePath={mdPath} showContent={false} />
      </div>
      <NaviBar />
    </div>
  )
}
export default About;