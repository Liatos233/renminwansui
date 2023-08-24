import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import style from './txtReader.module.less';

type Props = {
  filePath: string;
};

const TxtReader: React.FC<Props> = (props: Props) => {
  const [txtContent, setTxtContent] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pages: string[] = []; // 存储每个分页的内容
  const linesPerPage = 15; // 每页显示的行数

  useEffect(() => {
    fetch(props.filePath)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = function (event) {
          const content = event.target?.result;
          setTxtContent(content as string);
        };
        reader.readAsText(blob, 'GBK'); // 指定编码为 GBK
      })
      .catch(error => {
        console.error('Error reading txt file:', error);
      });
  }, [props]);

  // 将内容分页
  const splitPages = () => {
    const lines = txtContent.split('\n');
    let currentPageLines: string[] = [];
    let currentLineCount = 0;

    for (let line of lines) {
      if (currentLineCount + 1 <= linesPerPage) {
        currentPageLines.push(line);
        currentLineCount += 1;
      } else {
        pages.push(currentPageLines.join('\n'));
        currentPageLines = [line];
        currentLineCount = 1;
      }
    }

    if (currentPageLines.length > 0) {
      pages.push(currentPageLines.join('\n'));
    }
  }
  splitPages()

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 2, pages.length - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 2, 0));
  };

  return (
    <div className={style.layout}>
      <div className={style.leftPage}>
        <pre className={style.textStyle}>{pages[currentPage]}</pre>

      </div>
      <div className={style.rightPage}>
        <pre className={style.textStyle}>{pages[currentPage + 1]}</pre>
      </div>

      <div className={style.btnPrev}>
        <Button type='primary' onClick={handlePrevPage} disabled={currentPage === 0}>
          上一页
        </Button>
      </div>
      <div className={style.btnNext}>
        <Button type='primary' onClick={handleNextPage} disabled={currentPage === pages.length - 1}>
          下一页
        </Button>
      </div>
    </div>
  );
};

export default TxtReader;
