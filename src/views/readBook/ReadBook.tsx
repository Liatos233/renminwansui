import React, { useEffect, useState } from 'react';
import style from './readBook.module.less'
import { useSearchParams, useLocation } from 'react-router-dom';
import PdfReader from '@/components/pdfReader/PdfReader';
import MdReader from '@/components/mdReader/MdReader';
import TxtReader from '@/components/txtReader/TxtReader';
import EpubReader from '@/components/epubReader/EpubReader';

const ReadBook: React.FC = () => {

    const [searchParams] = useSearchParams();
    const stateParams = useLocation()
    const [fileType, setFileType] = useState('');
    const [filePath, setFilePath] = useState('');

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
        setFilePath(path)
    }, [searchParams, stateParams.state, fileType]);

    return (
        <div className={style.layout}>
            {fileType === 'md' && (
                <MdReader filePath={filePath} showContent={true} />
            )}
            {fileType === 'pdf' && (
                <PdfReader filePath={filePath} showToolBar={true} />
            )}
            {fileType === 'txt' && (
                <TxtReader filePath={filePath} />
            )}
            {fileType === 'epub' && (
                <EpubReader filePath={filePath} />
            )}
            {['md', 'pdf', 'txt', 'epub'].indexOf(fileType) === -1 && (
                <div>其他文件类型</div>
            )}
        </div >
    );

}
export default ReadBook;