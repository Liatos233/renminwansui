import React, { useEffect, useState } from 'react';
import MultiTabs from '@/components/multiTabs/MultiTabs';
import style from './home.module.less';
import { Divider, Input } from 'antd';
import assetsDataConfig from '@/assets/assetsDataConfig.json'
import type { TabsProps } from 'antd';
import CardsBox from '@/components/cardsBox/CardsBox';

const { Search } = Input;

type AssetsDataConfigType = {
    allBooks: Array<{
        folderName: string;
        allCategories: Array<{
            categoryName: string;
            books: Array<string>;
        }>;
    }>;
}

const Home: React.FC = () => {
    const [tabItems, setTabItems] = useState<TabsProps['items']>([]);

    // 设置所有的tab
    const setAllTab = (assetsDataConfig: AssetsDataConfigType) => {
        // 所有的书籍
        const allBooks = assetsDataConfig.allBooks;
        console.log('allBooks', allBooks);
        const tabItemsNew = allBooks.map((item, index) => {
            return {
                key: index.toString(),
                label: item.folderName,
                children: item.allCategories.map((item, index) => {
                    return <CardsBox key={index} cardsValue={item} />
                })
            }
        });
        setTabItems(tabItemsNew);
    }

    // 生命周期 - useEffect
    useEffect(() => {
        console.log('assetsDataConfig', assetsDataConfig);
        setAllTab(assetsDataConfig);
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
        </div>
    )
}
export default Home;