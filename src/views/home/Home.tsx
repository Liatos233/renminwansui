import React, { useEffect, useState } from 'react';
import MultiTabs from '@/components/multiTabs/MultiTabs';
import style from './home.module.less';
import { Divider, Input } from 'antd';
import assetsData from '@/assets/assetsData.json'
import type { TabsProps } from 'antd';

const { Search } = Input;

const Home: React.FC = () => {
    const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

    // 生命周期 - useEffect
    useEffect(() => {
        console.log('assetsData', assetsData);
        const tabItemsNew = assetsData.books.map((item, index) => {
            console.log('item', item);
            return {
                key: index.toString(),
                label: item.title,
                children: Object.keys(item.category).map((item2, index2) => {
                    return <div key={index2}>{item2}</div>
                })
            }
        });
        console.log('tabItemsNew', tabItemsNew);
        setTabItems(tabItemsNew);
        // console.log('tabItems', tabItems);
    }, []);

    const onSearch = (value: string) => {
        console.log(value)
    };

    return (
        <div className={style.layout}>
            <Search placeholder="input search text" onSearch={onSearch} enterButton allowClear />
            <Divider style={{ margin: '10px 0' }} />
            <MultiTabs tabItems={tabItems} />
        </div>
    )
}
export default Home;