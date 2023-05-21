const fs = require("fs");
const path = require("path");

// 当前路径
const currentPath = __dirname;
// 书籍路径
const booksPath = path.resolve(__dirname, "./books");

// 读取书籍目录
const files = fs.readdirSync(booksPath);
// 所有的书籍
const allBooks = [];

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

// 静态资源配置
const assetsDataConfig = {
  allBooks,
};

// 写入文件
fs.writeFileSync(
  currentPath + "/assetsDataConfig.json",
  JSON.stringify(assetsDataConfig),
  "utf8"
);
