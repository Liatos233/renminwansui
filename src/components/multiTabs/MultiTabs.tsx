import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface MultiTabsProps {
  tabItems: TabsProps['items'];
}

const MultiTabs: React.FC<MultiTabsProps> = ({ tabItems }) => {
  // console.log('tabItems', tabItems);

  return (
    <div>
      <Tabs
        type="card"
        defaultActiveKey="1"
        style={{ height: 220 }}
        items={tabItems}
      />
    </div>
  );
};

export default MultiTabs;