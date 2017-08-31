(function(window){
	var scrollbar = function(data){
		return new Customscrollbar(data).init();
	};
	var Customscrollbar = function(data){
		this.scrollbarBox = document.querySelector('#'+data.scrollbarBoxId);
		this.scrollbarContent = document.querySelector('#'+data.scrollbarContent);
		this.scrollbarDiv = document.querySelector('#'+data.scrollbarDiv);
		this.data = data;
		this.scrollbarContentHeight = '';
		this.downPageY = '';
		this.movePageY = '';
		this.changePageY = '';
		this.is_mouse_down = false;
	};
	Customscrollbar.prototype = {
		init : function(){
			// 获取dom
			this.dom();
			// 设置样式
			this.css();
			// 监听事件
			this.listener();
		},
		dom: function(){
			// 获取dom
			if(this.data.scrollbarBoxId&&this.data.scrollbarContentId){
				this.scrollbarBox = document.querySelector('#'+this.data.scrollbarBoxId);
				this.scrollbarContent = document.querySelector('#'+this.data.scrollbarContentId);
			}else{
				this.scrollbarBox = document.querySelector('#scrollbar-box');
				this.scrollbarContent = document.querySelector('#scrollbar-content');
			};
			// 创建模拟滚动条
			if(this.data.scrollbarDivClass){
				this.scrollbarDiv = document.createElement('div');
				this.scrollbarDiv.setAttribute('id', this.data.scrollbarDivId);
				this.scrollbarBox.appendChild(this.scrollbarDiv);
			}else{
				this.scrollbarDiv = document.createElement('div');
				this.scrollbarDiv.setAttribute('id', 'scrollbarDiv');
				this.scrollbarBox.appendChild(this.scrollbarDiv);
			}
		},
		css : function(){
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
			if(this.data.scrollbarDivWidth){
				this.scrollbarDiv.style.width = this.data.scrollbarDivWidth + 'px';
			}else{
				this.scrollbarDiv.style.width = '8px';
			};
			// 定位
			this.scrollbarDiv.style.position = 'absolute';
			this.scrollbarDiv.style.top = 0;
			this.scrollbarDiv.style.right = 0;
			// 颜色
			if(this.data.scrollbarDivColor){
				this.scrollbarDiv.style.background = this.data.scrollbarDivColor;
			}else{
				this.scrollbarDiv.style.background = '#cccccc';
			};
			// 圆角
			if(this.data.scrollbarDivRadius){
				this.scrollbarDiv.style.borderRadius = this.data.scrollbarDivRadius + 'px';
			}else{
				this.scrollbarDiv.style.borderRadius = 0;
			};
			// 显示
			this.scrollbarDiv.style.display = 'none';
		},
		listener: function(){
			this.scrollbarContent.addEventListener('mouseover', this.onMouseOver.bind(this), false);
			this.scrollbarContent.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
			this.scrollbarContent.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
			this.scrollbarDiv.addEventListener('mouseover', this.onMouseOver.bind(this), false);
			this.scrollbarDiv.addEventListener('mouseleave', this.onMouseLeave.bind(this), false);
			this.scrollbarDiv.addEventListener('mousewheel', this.onMouseWheel.bind(this), false);
			this.scrollbarDiv.addEventListener('mousedown', this.onMouseDown.bind(this), false);
			document.documentElement.addEventListener('mouseup', this.documentMouseUp.bind(this), false);
			document.documentElement.addEventListener('click', this.documentClick.bind(this), false);
			document.documentElement.addEventListener('mousemove', this.documentMouseMove.bind(this), false);
		},
		documentMouseUp: function(){
			if(this.is_mouse_down){
				this.is_mouse_down = false;
			};
		},
		documentClick: function(){
			if(this.is_mouse_down){
				this.is_mouse_down = false;
			}
		},
		documentMouseMove: function(e){
			// 阻止内容被选中
			e.preventDefault();
			if(this.is_mouse_down){
				this.scrollbarDiv.style.display = 'block';
				this.movePageY = e.pageY;
				this.changePageY = this.movePageY - this.downPageY;
				this.downPageY = this.movePageY;
				var changeValue = (this.scrollbarContent.offsetHeight-this.scrollbarBox.offsetHeight)*this.changePageY/(this.scrollbarBox.offsetHeight-this.scrollbarDiv.offsetHeight);
				this.scrollbarDiv.style.top = (this.scrollbarDiv.offsetTop + this.changePageY) + 'px';
				this.scrollbarContent.style.top = (this.scrollbarContent.offsetTop - changeValue) + 'px';
				this.reCss();
			}
		},
		onMouseDown: function(e){
			this.is_mouse_down = true;
			this.downPageY = e.pageY;
		},
		onMouseOver: function(){
			if(!this.scrollbarContentHeight){
				this.css(this.dataValue);
			};
			this.scrollbarDiv.style.display = 'block';
		},
		onMouseLeave: function(){
			this.scrollbarDiv.style.display = 'none';
		},
		onMouseWheel: function(e){
			// 阻止body滚动条滚动
			e.preventDefault();
			var sudu = (this.scrollbarContent.offsetHeight-this.scrollbarBox.offsetHeight)*e.wheelDelta/(this.scrollbarBox.offsetHeight-this.scrollbarDiv.offsetHeight);
			if(this.scrollbarDiv.offsetTop>0&&e.wheelDelta>0){
				this.scrollbarDiv.style.top = (this.scrollbarDiv.offsetTop - e.wheelDelta/3) + 'px';
				this.scrollbarContent.style.top = (this.scrollbarContent.offsetTop + sudu/3) + 'px';
				this.reCss();
			}else if(this.scrollbarDiv.offsetTop<this.scrollbarBox.offsetHeight-this.scrollbarDiv.offsetHeight&&e.wheelDelta<0){
				this.scrollbarDiv.style.top = (this.scrollbarDiv.offsetTop - e.wheelDelta/3) + 'px';
				this.scrollbarContent.style.top = (this.scrollbarContent.offsetTop + sudu/3) + 'px';
				this.reCss();
			};
		},
		reCss: function(){
			if(this.scrollbarDiv.offsetTop<0){
				this.scrollbarDiv.style.top = 0;
			};
			if(this.scrollbarDiv.offsetTop>this.scrollbarBox.offsetHeight-this.scrollbarDiv.offsetHeight){
				this.scrollbarDiv.style.top = this.scrollbarBox.offsetHeight-this.scrollbarDiv.offsetHeight + 'px';
			};
			if(this.scrollbarContent.offsetTop>0){
				this.scrollbarContent.style.top = 0;
			};
			if(-this.scrollbarContent.offsetTop>this.scrollbarContent.offsetHeight-this.scrollbarBox.offsetHeight){
				this.scrollbarContent.style.top = -(this.scrollbarContent.offsetHeight-this.scrollbarBox.offsetHeight) + 'px';
			};
			console.log('reCss');
		}
	};
	window.scrollbar = scrollbar;
})(window);
// 用法
// var data = {
// 		scrollbarBoxId: 'scrollbar-box',
// 		scrollbarContentId: 'scrollbar-content',
// 		scrollbarDivId: 'scrollbarDiv',	 // 模拟滚动条的id
// 		scrollbarDivWidth: '',	// 模拟滚动条的宽
// 		scrollbarDivColor: '',	// 模拟滚动条的颜色
// 		scrollbarDivRadius: '',	 // 模拟滚动条的圆角
// 	};
// scrollbar(data);



