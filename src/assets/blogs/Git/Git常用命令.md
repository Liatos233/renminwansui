## 1. 常用命令和操作

### 1. 删除分支

git branch -d master

### 2. 创建分支

git checkout -b master

### 3. 强制 push 本地 master 到远程 master

git push --force origin master
//（慎用，必须保证现在代码为最新）

### 4. git 修改历史提交信息

//n 表示要修改前 n 次所有的提交
//-i 中的 i 是 interactive，交互的意思
git rebase -i HEAD~n
//将需要修改的行的 pick 改成 edit 或 e，保存退出
//该命令可以对上一次提交有修改，可以修改文件也可以修改说明，不产生新的 commit
git commit –amend

## 2. 协作开发流程

1. 开发者将最新开发的版本代码 push 到 dev 分支
2. 管理者从将 dev 分支的代码合并到本地 dev 分支验证代码的正确性
3. 如果测试正确，则将本地 dev 分支合并到本地 master 分支，此时即为正式版本，push 到远程 master 分支
4. 如果测试有 bug，则回到 1
5. 之后有新的开发任务时，开发者和管理者都从 master 分支上获取最新的正式版本代码

## 3. 常用命令速查表

![常用命令速查表](https://imgur.com/x7at8Yy.jpg)
