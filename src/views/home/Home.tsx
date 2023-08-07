import React, { useEffect, useState, useRef } from 'react';
import style from './home.module.less';
import assetsDataConfig from '@/assets/assetsDataConfig.json'
import NaviBar from '@/components/naviBar/NaviBar';
// import SolarSystem from '@/components/plants/SolarSystem';

const Home: React.FC = () => {
    const [images, setImages] = useState<string[]>([]);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const bgContentRef = useRef<HTMLDivElement>(null);

    // 设置所有的图片
    const setAllImages = () => {
        // console.log('assetsDataConfig', assetsDataConfig);
        const allImages = assetsDataConfig.allImages[0].children.map(item => {
            const fullPath = require(`@/assets/images/${assetsDataConfig.allImages[0].title}/${item.title}`);
            return fullPath;
        });
        console.log('allImages', allImages);
        setImages(allImages);
    }

    // 处理背景图片切换时的回调函数
    const handleBgImageChange = (index: number) => {
        if (bgContentRef.current && images.length > 0) {
            // 获取背景图片的高度
            const contentHeight = bgContentRef.current.offsetHeight - 80;
            // 获取当前需要滚动的距离
            const newScrollTop = contentHeight * index;
            // 滚动到指定位置
            bgContentRef.current.scrollTo({ top: newScrollTop, behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    // 监听滚动位置以确定当前显示的图片
    const handleScroll = () => {
        if (bgContentRef.current) {
            // 获取背景图片的高度
            const contentHeight = bgContentRef.current.offsetHeight - 80;
            // 获取当前滚动的距离
            const scrollTop = bgContentRef.current.scrollTop;
            // 计算当前显示的图片的索引
            const newIndex = Math.round((scrollTop / contentHeight));
            // 计算当前显示的图片的索引
            // console.log(contentHeight, scrollTop, newIndex);
            setActiveIndex(newIndex);
        }
    };

    // 生命周期 - useEffect
    useEffect(() => {
        setAllImages();
        const bgContentRefCurrent = bgContentRef.current; // 保存当前引用到局部变量
        // 监听滚动位置以确定当前显示的图片
        if (bgContentRefCurrent) {
            bgContentRefCurrent.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (bgContentRefCurrent) {
                // 移除监听
                bgContentRefCurrent.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    return (
        <div className={style.layout}>
            {/* 背景 */}
            <div className={style.bgContent} ref={bgContentRef}>
                {/* <div className={style.backgrounds}>
                    <SolarSystem />
                </div> */}
                {images.map((item, index) => {
                    return (
                        <div key={index} className={style.backgrounds}>
                            <img className={style.background} src={item} alt='bg' />
                        </div>
                    )
                })}
            </div>
            {/* 背景导航 */}
            <div className={style.bgNavBar}>
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`${style.dot} ${index === activeIndex ? style.dotActive : ''}`}
                        onClick={() => handleBgImageChange(index)}
                    />
                ))}
            </div>
            <NaviBar />
        </div>
    )
}
export default Home;