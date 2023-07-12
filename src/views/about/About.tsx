import React from 'react';
import style from './about.module.css';
import NaviBar from '@/components/naviBar/NaviBar';
import PdfReader from '@/components/pdfReader/PdfReader';

const About: React.FC = () => {
  const pdfPath = '/resources/about/resume.pdf';
  return (
    <div className={style.about}>
      <div className={style.pdfContainer}>
        <PdfReader pdfPath={pdfPath} showToolBar={false} />
      </div>
      <NaviBar />
    </div>
  )
}
export default About;