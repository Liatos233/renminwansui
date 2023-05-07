import React from "react";
import { routerConfig } from "./config";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const RouterMain: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routerConfig.map((route, index) => {
          return (
            <Route
              key={index}
              path={route.path}
              element={<route.component />}
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default RouterMain;
