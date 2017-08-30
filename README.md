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
    <div id="scrollbar-box">
        <div id="scrollbar-content">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
                <li>8</li>
                <li>9</li>
            </ul>
        </div>
    </div>
    <script>
        var data = {
                scrollbarBoxId: 'scrollbar-box',
                scrollbarContentId: 'scrollbar-content',
                scrollbarDivId: 'scrollbarDiv',  // 模拟滚动条的id
                scrollbarDivWidth: '',  // 模拟滚动条的宽
                scrollbarDivColor: '',  // 模拟滚动条的颜色
                scrollbarDivRadius: '',  // 模拟滚动条的圆角
            };
        scrollbar.init(data);
    </script>
```

### 各个浏览器自带的滚动条修改方法链接
https://yunanguo.github.io/2017/08/30/%E4%B8%BB%E6%B5%81%E6%B5%8F%E8%A7%88%E5%99%A8%E6%8F%90%E4%BE%9B%E7%9A%84%E6%BB%9A%E5%8A%A8%E6%9D%A1%E6%A0%B7%E5%BC%8F%E4%BF%AE%E6%94%B9%E6%96%B9%E6%B3%95/

