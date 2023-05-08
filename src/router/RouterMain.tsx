import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { routerConfig } from "./routerConfig";

const RouterMain: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routerConfig.map(route => {
          return (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            >
            </Route>
          )
        })}
      </Routes>
    </BrowserRouter >
  )
}

export default RouterMain; 
