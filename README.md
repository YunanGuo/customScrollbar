# div模拟滚动条
### 问题：
- 浏览器自带默认滚动条样式不符合产品要求
- 滚动条占位影响用户体验
- 即使一些浏览器提供了自定义滚动条的一些方法依然存在占位的问题

### 初衷：
- 解决滚动条占位问题
- 样式自定义满足产品需求

### 使用方法：
```
    <style>
        #scrollbar-box::-webkit-scrollbar
        {
            height: 0px;
            width: 0px;
        }
    </style>

    <div id="container">
        <div id="scrollbar-box">
            <div id="scrollbar-content"></div>
        </div>
    </div>

    <script>
        scrollbar({
            scrollbarBoxId: 'scrollbar-box',
            scrollbarContentId: 'scrollbar-content',
            scrollbarYId: 'scrollbar-y',  // 模拟滚动条的id
            scrollbarXId: 'scrollbar-x',  // 模拟滚动条的id
            scrollbarYWidth: '',  // 模拟滚动条的宽
            scrollbarXWidth: '',  // 模拟滚动条的宽
            scrollbarYColor: '',  // 模拟滚动条的颜色
            scrollbarXColor: '',  // 模拟滚动条的颜色
            scrollbarYRadius: 10,  // 模拟滚动条的圆角
            scrollbarXRadius: 10,  // 模拟滚动条的圆角
        })
    </script>
```

### 各个浏览器自带的滚动条修改方法链接
https://yunanguo.github.io/2017/08/30/%E4%B8%BB%E6%B5%81%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%90%E4%BE%9B%E7%9A%84%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%A0%B7%E5%BC%8F%E4%BF%AE%E6%94%B9%E6%96%B9%E6%B3%95/

