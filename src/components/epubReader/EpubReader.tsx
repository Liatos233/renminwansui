import React, { useEffect, useState } from 'react'
import style from './epubReader.module.less'

type Props = {
  filePath: string;
}

const EpubReader: React.FC<Props> = (props: Props) => {


  useEffect(() => {
    // console.log('props.filePath', props.filePath);
  }, [props]);

  return (
    <div className={style.layout}>
      epub
    </div >
  )
}

export default EpubReader;
