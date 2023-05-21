import React, { useEffect, useState } from 'react';
import style from './readBook.module.less'
import { useSearchParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ReadBook: React.FC = () => {

    const [searchParams] = useSearchParams();
    const [markdownText, setMarkdownText] = useState('');
    const stateParams = useLocation()

    useEffect(() => {
        // 文件夹名
        const folderName = stateParams.state.folderName;
        // 类别名
        const catagoryName = stateParams.state.catagoryName;
        // 书名
        const bookName = searchParams.get('bookName');// console.log('', folderName, catagoryName, bookName);
        // 书的路径
        const path = `/resources/books/${folderName}/${catagoryName}/${bookName}`;
        // 读取书的内容
        async function fetchMarkdown() {
            console.log('path', path);
            const response = await fetch(path);
            const text = await response.text();
            // console.log('text', text);
            setMarkdownText(text);
        }
        fetchMarkdown();
    }, [searchParams, stateParams.state]);

    return (
        <div className={style.layout}>
            <div className="markdown-body">
                <ReactMarkdown>{markdownText}</ReactMarkdown>
            </div>
        </div>

    );
}
export default ReadBook;