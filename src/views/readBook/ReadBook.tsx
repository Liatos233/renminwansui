import React, { useEffect, useState } from 'react';
import style from './readBook.module.less'
import { useSearchParams, useLocation } from 'react-router-dom';
import PdfReader from '@/components/pdfReader/PdfReader';
import MdReader from '@/components/mdReader/mdReader';

const ReadBook: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [mdPath, setMdPath] = useState('');
    const stateParams = useLocation()
    const [fileType, setFileType] = useState('');
    const [pdfPath, setPdfPath] = useState('');


    // 读取markdown内容
    async function fetchMarkdown(path: string) {
        console.log('path', path);
        setMdPath(path);
    }

    // 读取pdf内容
    function fetchPdf(path: string) {
        console.log('path', path);
        setPdfPath(path);
    }

    useEffect(() => {
        // 文件夹名
        const folderName = stateParams.state.folderName;
        // 类别名
        const catagoryName = stateParams.state.catagoryName;
        // 书名
        const bookName = searchParams.get('bookName');
        // console.log('', folderName, catagoryName, bookName);
        // 书的路径
        const path = require(`@/assets/books/${folderName}/${catagoryName}/${bookName}`);
        // 判断文件类型
        console.log('bookName', bookName);
        const fileTypeExtension = bookName?.split('.').pop() || '';
        console.log('fileTypeExtension', fileTypeExtension);
        setFileType(fileTypeExtension);
        console.log('fileType', fileType);
        if (fileTypeExtension === 'md') {
            // 读取md的内容
            fetchMarkdown(path);
        } else if (fileTypeExtension === 'pdf') {
            // 读取pdf的内容
            fetchPdf(path);
        } else {

        }
    }, [searchParams, stateParams.state, fileType]);

    return (
        <div className={style.layout}>
            {fileType === 'md' ? (
                <div className={style.mdContainer}>
                    <MdReader mdPath={mdPath} showContent={true} />
                </div>
            ) : fileType === 'pdf' ? (
                <div className={style.pdfContainer}>
                    <PdfReader pdfPath={pdfPath} showToolBar={true} />
                </div>
            ) : (
                <div>其他文件类型</div>
            )
            }
        </div >
    );

}
export default ReadBook;