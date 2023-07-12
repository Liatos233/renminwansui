import React, { useState } from 'react';
import NaviBar from '@/components/naviBar/NaviBar';
import DicTree from '@/components/dicTree/DicTree';
import MdReader from '@/components/mdReader/mdReader';
import style from './blog.module.less';
import assetsDataConfig from '@/assets/assetsDataConfig.json'

const Blog: React.FC = () => {

  const [mdPath, setMdPath] = useState('');

  const allBlogs = assetsDataConfig.allBlogs
  // console.log('allBlogs', allBlogs);

  const showDetail = (path: String) => {
    console.log('path', path);
    const fullPath = `/resources/blogs/${path}`;
    console.log('fullPath', fullPath);
    setMdPath(fullPath);
  }

  return (
    <div className={style.layout}>
      <div className={style.dicTree}>
        <DicTree originTreeData={allBlogs} showDetail={showDetail} />
      </div>
      <div className={style.divider} />
      <div className={style.content}>
        {mdPath && <MdReader mdPath={mdPath} />}
      </div>
      <NaviBar />
    </div>
  )
}
export default Blog;