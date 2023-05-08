import React from 'react';
import './homeLayout.less';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from "@/router/routerConfig";
import NaviBar from '@/components/naviBar/naviBar';

const HomeLayout: React.FC = () => {

  // 从路由配置中找到根路由的子路由
  const homeRoutes = routerConfig.find((route) => route.path === '*')?.children || [];

  return (
    <div className='layout'>
      {/* 内容区域 */}
      <div className='content'>
        <Routes>
          {homeRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div >
      {/* 导航区域 */}
      <div className='bar'>
        <NaviBar />
      </div>
    </div >
  )
}
export default HomeLayout;