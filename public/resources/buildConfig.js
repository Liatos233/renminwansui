const fs = require("fs");
const path = require("path");

// 获取所有书籍
const getAllBooks = (booksPath) => {
  // 读取书籍目录
  const files = fs.readdirSync(booksPath);
  // 所有的书籍
  const allBooks = [];
  // 读取书籍
  files.forEach((folder) => {
    const category = fs.readdirSync(`${booksPath}/${folder}`);
    let allCategories = [];
    category.forEach((category) => {
      const state = fs.statSync(`${booksPath}/${folder}/${category}`);
      let books = [];
      if (state.isDirectory()) {
        // 如果是目录,继续读取目录及其子文件
        books = fs.readdirSync(`${booksPath}/${folder}/${category}`);
        // console.log(category);
        const categoryName = category;
        allCategories.push({ categoryName, books });
      }
    });
    // console.log(allCategories);
    allBooks.push({
      folderName: folder,
      allCategories: allCategories,
    });
  });
  // console.log(JSON.stringify(allBooks));
  return allBooks;
};

// 获取所有博客
const getAllBlogs = (folderPath) => {
  const stats = fs.statSync(folderPath);
  if (stats.isDirectory()) {
    const folderName = path.basename(folderPath);
    const node = {
      title: folderName,
      children: [],
    };
    const files = fs.readdirSync(folderPath);
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);
      const childNode = getAllBlogs(filePath);
      node.children.push(childNode);
    });
    return node;
  } else {
    return {
      title: path.basename(folderPath),
    };
  }
};

// 书籍路径
const booksFolderPath = path.resolve(__dirname, "./books");
const allBooks = getAllBooks(booksFolderPath);
// 博客路径
const blogsFolderPath = path.resolve(__dirname, "./blogs");
const allBlogs = getAllBlogs(blogsFolderPath).children;
console.log(JSON.stringify(allBlogs, null, 2));

// 静态资源配置
const assetsDataConfig = {
  allBooks,
  allBlogs,
};

// 写入文件
fs.writeFileSync(
  path.resolve(__dirname, "./assetsDataConfig.json"),
  JSON.stringify(assetsDataConfig),
  "utf8"
);
