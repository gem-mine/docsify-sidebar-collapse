# 树形展开

首先多级加载会导致延迟，必须关闭，通过`alias`选项。

在不刷新的情况下，需要支持

- 自动展开父级
- 页面不闪动
- 支持空连接(href="#/")

## 详细

1. className中，`active`是`docisfy`给当前符合路由的`li`增加的，追加一个`open`用于展开
2. 父级`add open`的时候，子级也一并`add open`
3. 跨分支点击互不影响
