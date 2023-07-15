import React, { useEffect, useState } from 'react'
import { Button, Drawer } from 'antd';
import ReactMarkdown from 'react-markdown';
// 划线、表、任务列表和直接url等的语法扩展
import remarkGfm from 'remark-gfm';
// 解析标签，支持html语法
import rehypeRaw from 'rehype-raw';
// 代码高亮
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// 代码高亮主题风格
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
// markdown目录
import MarkNav from 'markdown-navbar';
import './markNav.css'
import style from './mdReader.module.less'

type Props = {
  mdPath: string;
  showContent: boolean;
}

const MdReader: React.FC<Props> = (props: Props) => {

  const [markdownText, setMarkdownText] = useState('');
  const [contentDrawerOpen, setContentDrawerOpen] = useState(false);

  // 读取markdown内容
  async function fetchMarkdown(path: string) {
    // console.log('path', path);
    const response = await fetch(path);
    const text = await response.text();
    // console.log('text', text);
    setMarkdownText(text);
  }

  const showDrawer = () => {
    setContentDrawerOpen(true);
  };

  const onClose = () => {
    setContentDrawerOpen(false);
  };

  useEffect(() => {
    // 读取md的内容
    // console.log('props.mdPath', props.mdPath);
    fetchMarkdown(props.mdPath);
  }, [props]);

  return (
    <div className={style.layout}>
      {props.showContent ?
        <div>
          <div style={{ position: "absolute", right: 0 }}>
            <Button type="primary" onClick={showDrawer}>目录</Button>
          </div>
          <Drawer title="Content" placement="right" onClose={onClose} open={contentDrawerOpen}>
            <MarkNav
              className="article"
              source={markdownText}
              headingTopOffset={40} //离顶部的距离
              ordered={false}   //是否显示识别的标题序号
            />
          </Drawer>
        </div> : null
      }
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        // className={"markdown-body"}
        components={{
          code({ node, inline, className, children, ...props }) {
            // 匹配language
            const match = /language-(\w+)/.exec(className || '');
            // 语法高亮
            return !inline && match ? (
              <SyntaxHighlighter
                showLineNumbers={false}
                style={darcula as any}
                language={match[1]}
                PreTag='div'
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {markdownText}
      </ReactMarkdown>
    </div >
  )
}

export default MdReader;
