import React, { useRef, useState } from 'react';
import style from "./window.module.less";

const Window: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false); // 用于跟踪窗口是否正在被拖拽
  const [position, setPosition] = useState({ x: 0, y: 0 }); // 用于存储窗口的当前位置
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 }); // 用于存储拖拽开始时的鼠标位置

  const oneWindowRef = useRef<HTMLDivElement>(null);

  // 处理鼠标进入事件的函数
  const handleMouseEnter = () => {
  };

  // 处理鼠标离开事件的函数
  const handleMouseLeave = () => {
    setIsDragging(false); // 停止拖拽
  };

  // 处理鼠标按下事件的函数
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button === 0) { // 检查是否按下了左键鼠标按钮（按钮代码为 0）
      // console.log('onMouseDown');
      setIsDragging(true); // 开始拖拽
      setDragStartPos({ x: e.clientX, y: e.clientY }); // 存储拖拽开始时的鼠标位置
    }
  };

  // 处理鼠标移动事件的函数
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartPos.x;
      const deltaY = e.clientY - dragStartPos.y;
      setPosition({ x: position.x + deltaX, y: position.y + deltaY });
      setDragStartPos({ x: e.clientX, y: e.clientY });
      // 更新窗口位置
      if (oneWindowRef.current) {
        oneWindowRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    }
  };

  // 处理鼠标释放事件的函数
  const handleMouseUp = () => {
    setIsDragging(false); // 停止拖拽
    // console.log('onMouseUp');
  };

  return (
    <div className={style.layout}>
      {/* 窗口元素 */}
      <div className={style.oneWindow} ref={oneWindowRef}>
        {/* 窗口header */}
        <div
          className={style.windowHeader}
          style={{
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
        </div>
        {/* 窗口Content */}
        <div className={style.windowContent}>
          This is a dragable window
        </div>
      </div>
    </div>
  );
};

export default Window;
