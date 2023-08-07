import React from 'react';
import style from './bookCarousel.module.less';
import assetsDataConfig from '@/assets/assetsDataConfig.json'

const BookCarousel: React.FC = () => {

  const allImages = assetsDataConfig.allImages[0].children.map(item => {
    const fullPath = require(`@/assets/images/${assetsDataConfig.allImages[0].title}/${item.title}`);
    return fullPath;
  });
  // console.log('allImages', allImages);

  return (
    <div className={style.carousel}>
      <ul>
        {
          allImages.map((item, index) => {
            return <li key={index}><img src={item} alt="" /></li>;
          })
        }
      </ul>
    </div>
  );
};

export default BookCarousel;
