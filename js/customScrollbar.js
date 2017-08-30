(function(){
	var scrollbar = {
		scrollbarBox: '',
		scrollbarContent: '',
		scrollbarDiv: '',	//模拟的滚动条
		dataValue: '',
		scrollbarDivHeight: '',
		downPageY: '',
		movePageY: '',
		changePageY: '',
		is_mouse_down: false,
		init : function(data){
			this.dataValue = data;
			// 获取dom
			this.dom(data);
			// 设置样式
			this.css(data);
			// 监听事件
			this.listener();
		},
		dom: function(data){
			// 获取dom
			if(data.scrollbarBoxId&&data.scrollbarContentId){
				this.scrollbarBox = document.querySelector('#'+data.scrollbarBoxId);
				this.scrollbarContent = document.querySelector('#'+data.scrollbarContentId);
			}else{
				this.scrollbarBox = document.querySelector('#scrollbar-box');
				this.scrollbarContent = document.querySelector('#scrollbar-content');
			};
			// 创建模拟滚动条
			if(data.scrollbarDivClass){
				this.scrollbarDiv = document.createElement('div');
				this.scrollbarDiv.setAttribute('id', data.scrollbarDivId);
				this.scrollbarBox.appendChild(this.scrollbarDiv);
			}else{
				this.scrollbarDiv = document.createElement('div');
				this.scrollbarDiv.setAttribute('id', 'scrollbarDiv');
				this.scrollbarBox.appendChild(this.scrollbarDiv);
			}
		},
		css : function(data){
			// 父子元素定位
			if(this.scrollbarBox.style.position != 'relative'&&this.scrollbarBox.style.position != 'absolute'){
				this.scrollbarBox.style.position = 'relative';
			};
			if(this.scrollbarContent.style.position != 'relative'&&this.scrollbarContent.style.position != 'absolute'){
				this.scrollbarContent.style.position = 'absolute';
			};
			// 超出隐藏
			this.scrollbarBox.style.overflow = 'hidden';
			this.scrollbarContent.style.width = '100%';
			// 自定义的滚动条样式
			var scrollbarBoxHeight = this.scrollbarBox.offsetHeight;
			this.scrollbarContentHeight = this.scrollbarContent.offsetHeight;
			// 高
			var scrollbarDivHeight = scrollbarBoxHeight*scrollbarBoxHeight/this.scrollbarContentHeight;
			this.scrollbarDiv.style.height = scrollbarDivHeight + 'px';
			// 宽
			if(data.scrollbarDivWidth){
				this.scrollbarDiv.style.width = data.scrollbarDivWidth + 'px';
			}else{
				this.scrollbarDiv.style.width = '8px';
			};
			// 定位
			this.scrollbarDiv.style.position = 'absolute';
			this.scrollbarDiv.style.top = 0;
			this.scrollbarDiv.style.right = 0;
			// 颜色
			if(data.scrollbarDivColor){
				this.scrollbarDiv.style.background = data.scrollbarDivColor;
			}else{
				this.scrollbarDiv.style.background = '#cccccc';
			};
			// 圆角
			if(data.scrollbarDivRadius){
				this.scrollbarDiv.style.borderRadius = data.scrollbarDivRadius + 'px';
			}else{
				this.scrollbarDiv.style.borderRadius = 0;
			};
			// 显示
			this.scrollbarDiv.style.display = 'none';
		},
		listener: function(){
			this.scrollbarContent.addEventListener('mouseover', this.onMouseOver, false);
			this.scrollbarContent.addEventListener('mouseleave', this.onMouseLeave, false);
			this.scrollbarContent.addEventListener('mousewheel', this.onMouseWheel, false);
			this.scrollbarDiv.addEventListener('mouseover', this.onMouseOver, false);
			this.scrollbarDiv.addEventListener('mouseleave', this.onMouseLeave, false);
			this.scrollbarDiv.addEventListener('mousewheel', this.onMouseWheel, false);
			this.scrollbarDiv.addEventListener('mousedown', this.onMouseDown, false);
			document.documentElement.addEventListener('mouseup', this.documentMouseUp, false);
			document.documentElement.addEventListener('click', this.documentClick, false);
			document.documentElement.addEventListener('mousemove', this.documentMouseMove, false);
		},
		documentMouseUp: function(){
			if(scrollbar.is_mouse_down){
				scrollbar.is_mouse_down = false;
			};
		},
		documentClick: function(){
			if(scrollbar.is_mouse_down){
				scrollbar.is_mouse_down = false;
			}
		},
		documentMouseMove: function(e){
			// 阻止内容被选中
			e.preventDefault();
			if(scrollbar.is_mouse_down){
				scrollbar.scrollbarDiv.style.display = 'block';
				scrollbar.movePageY = e.pageY;
				scrollbar.changePageY = scrollbar.movePageY - scrollbar.downPageY;
				scrollbar.downPageY = scrollbar.movePageY;
				var changeValue = (scrollbar.scrollbarContent.offsetHeight-scrollbar.scrollbarBox.offsetHeight)*scrollbar.changePageY/(scrollbar.scrollbarBox.offsetHeight-scrollbar.scrollbarDiv.offsetHeight);
				scrollbar.scrollbarDiv.style.top = (scrollbar.scrollbarDiv.offsetTop + scrollbar.changePageY) + 'px';
				scrollbar.scrollbarContent.style.top = (scrollbar.scrollbarContent.offsetTop - changeValue) + 'px';
				scrollbar.reCss();
			}
		},
		onMouseDown: function(e){
			scrollbar.is_mouse_down = true;
			scrollbar.downPageY = e.pageY;
		},
		onMouseOver: function(){
			if(!scrollbar.scrollbarContentHeight){
				scrollbar.css(scrollbar.dataValue);
			};
			scrollbar.scrollbarDiv.style.display = 'block';
		},
		onMouseLeave: function(){
			scrollbar.scrollbarDiv.style.display = 'none';
		},
		onMouseWheel: function(e){
			var sudu = (scrollbar.scrollbarContent.offsetHeight-scrollbar.scrollbarBox.offsetHeight)*e.wheelDelta/(scrollbar.scrollbarBox.offsetHeight-scrollbar.scrollbarDiv.offsetHeight);
			if(scrollbar.scrollbarDiv.offsetTop>0&&e.wheelDelta>0){
				scrollbar.scrollbarDiv.style.top = (scrollbar.scrollbarDiv.offsetTop - e.wheelDelta/3) + 'px';
				scrollbar.scrollbarContent.style.top = (scrollbar.scrollbarContent.offsetTop + sudu/3) + 'px';
				scrollbar.reCss();
			}else if(scrollbar.scrollbarDiv.offsetTop<scrollbar.scrollbarBox.offsetHeight-scrollbar.scrollbarDiv.offsetHeight&&e.wheelDelta<0){
				scrollbar.scrollbarDiv.style.top = (scrollbar.scrollbarDiv.offsetTop - e.wheelDelta/3) + 'px';
				scrollbar.scrollbarContent.style.top = (scrollbar.scrollbarContent.offsetTop + sudu/3) + 'px';
				scrollbar.reCss();
			};
		},
		reCss: function(){
			if(scrollbar.scrollbarDiv.offsetTop<0){
				scrollbar.scrollbarDiv.style.top = 0;
			};
			if(scrollbar.scrollbarDiv.offsetTop>scrollbar.scrollbarBox.offsetHeight-scrollbar.scrollbarDiv.offsetHeight){
				scrollbar.scrollbarDiv.style.top = scrollbar.scrollbarBox.offsetHeight-scrollbar.scrollbarDiv.offsetHeight + 'px';
			};
			if(scrollbar.scrollbarContent.offsetTop>0){
				scrollbar.scrollbarContent.style.top = 0;
			};
			if(-scrollbar.scrollbarContent.offsetTop>scrollbar.scrollbarContent.offsetHeight-scrollbar.scrollbarBox.offsetHeight){
				scrollbar.scrollbarContent.style.top = -(scrollbar.scrollbarContent.offsetHeight-scrollbar.scrollbarBox.offsetHeight) + 'px';
			};
			console.log('reCss');
		}
	};
	window.scrollbar = scrollbar;
	return scrollbar;
})();
// var data = {
// 		scrollbarBoxId: 'scrollbar-box',
// 		scrollbarContentId: 'scrollbar-content',
// 		scrollbarDivId: 'scrollbarDiv',	 // 模拟滚动条的id
// 		scrollbarDivWidth: '',	// 模拟滚动条的宽
// 		scrollbarDivColor: '',	// 模拟滚动条的颜色
// 		scrollbarDivRadius: '',	 // 模拟滚动条的圆角
// 	};
// scrollbar.init(data);