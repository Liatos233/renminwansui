import React from 'react';
import style from './basicLayout.module.less';
import { Outlet } from 'react-router-dom';

const BasicLayout: React.FC = () => {

  return (
    <div className={style.layout}>
      {/* 内容区域 */}
      <div className={style.content}>
        <Outlet />
      </div >
    </div >
  )
}
export default BasicLayout;