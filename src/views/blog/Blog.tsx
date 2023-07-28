import React, { useState } from 'react';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import NaviBar from '@/components/naviBar/NaviBar';
import DicTree from '@/components/dicTree/DicTree';
import MdReader from '@/components/mdReader/mdReader';
import style from './blog.module.less';
import assetsDataConfig from '@/assets/assetsDataConfig.json'
import Plants from '@/components/plants/Plants';

const Blog: React.FC = () => {

  const [mdPath, setMdPath] = useState('');
  const [showDicTree, setShowDicTree] = useState(true);

  const allBlogs = assetsDataConfig.allBlogs
  // console.log('allBlogs', allBlogs);

  const showDetail = (path: String) => {
    console.log('path', path);
    const fullPath = require(`@/assets/blogs/${path}`);
    console.log('fullPath', fullPath);
    setMdPath(fullPath);
  }

  const isShowDicTree = () => {
    setShowDicTree(!showDicTree);
  }

  return (
    <div className={style.layout}>
      <div className={`${style.dicTree} ${showDicTree ? '' : style.dicTreeCollapsed}`}>
        <DicTree originTreeData={allBlogs} showDetail={showDetail} />
      </div>
      <div className={`${style.tool} ${showDicTree ? '' : style.toolCollapsed}`} onClick={() => isShowDicTree()}>
        {showDicTree ? <DoubleLeftOutlined /> : <DoubleRightOutlined />}
      </div>
      <div className={style.content}>
        {mdPath ?
          <MdReader mdPath={mdPath} showContent={true} /> :
          <div className={style.blankContent}>
            <Plants />
          </div>}
      </div>
      <NaviBar />
    </div>
  )
}
export default Blog;