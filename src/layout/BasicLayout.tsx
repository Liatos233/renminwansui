import React from 'react';
import style from './basicLayout.module.less';
import { Route, Routes } from 'react-router-dom';
import { routerConfig } from "@/router/routerConfig";

const BasicLayout: React.FC = () => {

  // 从路由配置中找到根路由的子路由
  const basicRoutes = routerConfig.find((route) => route.path === '/*')?.children || [];

  return (
    <div className={style.layout}>
      {/* 内容区域 */}
      <div className={style.content}>
        <Routes>
          {basicRoutes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div >
    </div >
  )
}
export default BasicLayout;