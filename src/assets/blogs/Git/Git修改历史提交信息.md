## 1."git rebase -i HEAD~n

> n 表示要修改前 n 次的提交
> -i 中的 i 是 interactive

## 2.将需要修改的行的 pick 改成 edit 或 e，保存退出

## 3.使用 git commit --amend 来修改上一个 commit

## 4.使用 git rebase --continue 使得其修改生效
