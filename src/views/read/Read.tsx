import React, { useEffect, useState } from 'react';
import MultiTabs from '@/components/multiTabs/MultiTabs';
import style from './read.module.less';
import { Divider, Input } from 'antd';
import assetsDataConfig from '@/assets/assetsDataConfig.json'
import type { TabsProps } from 'antd';
import CardsBox from '@/components/cardsBox/CardsBox';
import NaviBar from '@/components/naviBar/NaviBar';

const { Search } = Input;

const Read: React.FC = () => {
    const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

    // 设置所有的tab
    const setAllTab = () => {
        // 所有的书籍
        console.log('assetsDataConfig', assetsDataConfig);
        const allBooks = assetsDataConfig.allBooks;
        console.log('allBooks', allBooks);
        const tabItemsNew = allBooks.map((item, index) => {
            const folderName = item.folderName;
            return {
                key: index.toString(),
                label: folderName,
                children: item.allCategories.map((item, i) => {
                    return <CardsBox key={i} folderName={folderName} cardsValue={item} />
                })
            }
        });
        setTabItems(tabItemsNew);
    }

    // 生命周期 - useEffect
    useEffect(() => {
        console.log('assetsDataConfig', assetsDataConfig);
        setAllTab();
    }, []);

    // 搜索
    const onSearch = (value: string) => {
        console.log(value)
    };

    return (
        <div className={style.layout}>
            <Search placeholder="请输入关键字" onSearch={onSearch} enterButton allowClear />
            <Divider style={{ margin: '10px 0' }} />
            <MultiTabs tabItems={tabItems} />
            <NaviBar />
        </div>
    )
}
export default Read;