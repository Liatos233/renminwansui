import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown';
import style from './mdReader.module.less'

type Props = {
  mdPath: string;
}

const MdReader: React.FC<Props> = (props: Props) => {

  const [markdownText, setMarkdownText] = useState('');

  // 读取markdown内容
  async function fetchMarkdown(path: string) {
    // console.log('path', path);
    const response = await fetch(path);
    const text = await response.text();
    // console.log('text', text);
    setMarkdownText(text);
  }

  useEffect(() => {
    // 读取md的内容
    // console.log('props.mdPath', props.mdPath);
    fetchMarkdown(props.mdPath);
  }, [props]);

  return (
    <div className={style.layout}>
      <ReactMarkdown>{markdownText}</ReactMarkdown>
    </div>
  )
}

export default MdReader;
