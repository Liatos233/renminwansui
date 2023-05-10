import React from 'react';
import style from './homeLayout.module.less';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from "@/router/routerConfig";
import NaviBar from '@/components/naviBar/NaviBar';

const HomeLayout: React.FC = () => {

  // 从路由配置中找到根路由的子路由
  const homeRoutes = routerConfig.find((route) => route.path === '*')?.children || [];

  return (
    <div className={style.layout}>
      {/* 内容区域 */}
      <div className={style.content}>
        <Routes>
          {homeRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div >
      {/* 导航区域 */}
      <div className={style.bar}>
        <NaviBar />
      </div>
    </div >
  )
}
export default HomeLayout;