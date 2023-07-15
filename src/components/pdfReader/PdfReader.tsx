import React, { useState } from 'react'
import { Input, Space, Spin, Tooltip } from 'antd';
import {
  PlusCircleOutlined,
  MinusCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';
import style from './pdfReader.module.less'
// https://github.com/wojtekmaj/react-pdf
import { Document, Page, pdfjs } from 'react-pdf'

// For React-PDF to work, PDF.js worker needs to be provided
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

type Props = {
  pdfPath: string;
  showToolBar: boolean;
}

const PdfReader: React.FC<Props> = (props: Props) => {

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumberFocus, setPageNumberFocus] = useState(false);
  const [pageNumberInput, setPageNumberInput] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const pageOriginWidth = window.screen.width * 0.4;
  const pageOriginHeight = window.screen.height - 80;
  const [pageWidth, setPageWidth] = useState(pageOriginWidth);
  const [pageHeight, setPageHeight] = useState(pageOriginHeight);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function nextPage() {
    setCurrentPage(prevPage => prevPage + 1);
    setPageNumberInput(currentPage + 1);
  }

  function previousPage() {
    setCurrentPage(prevPage => prevPage - 1);
    setPageNumberInput(currentPage - 1);
  }

  function onPageNumberFocus() {
    setPageNumberFocus(true);
  };

  function onPageNumberBlur() {
    setPageNumberFocus(false);
    setPageNumberInput(currentPage);
  };

  // 输入页码变化
  function onPageNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.currentTarget.value);
    value = value <= 0 ? 1 : value;
    value = value >= numPages ? numPages : value;
    setPageNumberInput(value);
  };

  // 页面跳转
  function jumpToPage() {
    console.log('pageNumberInput', pageNumberInput);
    setCurrentPage(pageNumberInput);
  };

  function pageZoomOut() {
    if (pageWidth <= pageOriginWidth) {
      return
    }
    setPageWidth(pageWidth * 0.8)
  }

  function pageZoomIn() {
    setPageWidth(pageWidth * 1.2)
  }

  function pageFullscreen() {
    if (fullscreen) {
      setFullscreen(false)
      setPageWidth(pageOriginWidth)
    } else {
      setFullscreen(true)
      console.log('', window.screen.width);
      setPageWidth(window.screen.width * 0.5)
    }
  }

  return (
    <div className={style.layout}>
      <div className={style.pageContainer}>
        <Document
          file={props.pdfPath}
          loading={<Spin size='large' />}
          onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            className={style.pdfPage}
            // width={pageWidth}
            height={pageHeight}
            pageNumber={currentPage}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        </Document>
      </div>
      {props.showToolBar && (
        <div className={style.pageTools}>
          <Space>
            <Tooltip title={currentPage === 1 ? "已是第一页" : "上一页"}>
              <LeftOutlined onClick={previousPage} disabled={currentPage <= 1} />
            </Tooltip>
            <Input
              value={pageNumberFocus ? pageNumberInput : currentPage}
              onFocus={onPageNumberFocus}
              onBlur={onPageNumberBlur}
              onChange={onPageNumberChange}
              onPressEnter={jumpToPage}
              type="number"
            /> / {numPages}
            <Tooltip title={currentPage === numPages ? "已是最后一页" : "下一页"}>
              <RightOutlined onClick={nextPage} disabled={currentPage >= numPages} />
            </Tooltip>
            <Tooltip title="放大">
              <PlusCircleOutlined onClick={pageZoomIn} />
            </Tooltip>
            <Tooltip title="缩小">
              <MinusCircleOutlined onClick={pageZoomOut} />
            </Tooltip>
            <Tooltip title={fullscreen ? "恢复默认" : '全屏'}>
              {fullscreen ?
                <FullscreenExitOutlined onClick={pageFullscreen} /> :
                <FullscreenOutlined onClick={pageFullscreen} />}
            </Tooltip>
          </Space>
        </div>
      )}
    </div>
  )
}

export default PdfReader;
