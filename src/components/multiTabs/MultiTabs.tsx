import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import style from './multiTabs.module.less';

interface MultiTabsProps {
  tabItems: TabsProps['items'];
}

const MultiTabs: React.FC<MultiTabsProps> = ({ tabItems }) => {
  // console.log('tabItems', tabItems);

  return (
    <Tabs
      className={style.multiTabs}
      type="card"
      defaultActiveKey="1"
      style={{ height: '100%' }}
      items={tabItems}
    />
  );
};

export default MultiTabs;