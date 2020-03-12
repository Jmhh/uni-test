<template>
    <div v-if="opts.isVisible" class="uniPop" :class="opts.isCloseCls">
        <div class="unipop__ui_panel">
            <div v-if="opts.shade" class="unipop__ui_mask" @tap="shadeTaped"></div>
            <div class="unipop__ui_main">
                <div class="unipop__ui_child" :style="opts.style">
                    <!-- 标题 -->
                    <div v-if="opts.title" class="unipop__ui_tit">{{opts.title}}</div>
                    <!-- 内容 -->
                    <div v-if="opts.content" class="unipop__ui_cnt" :style="opts.contentStyle">
                        {{opts.content}}
                    </div>
                    <div v-if="opts.btns" class="unipop__ui_btns">
                        <text v-for="(item,index) in opts.btns" :key="index" class="btn" :style="item.style" @tap="btnTaped(item)">{{item.text}}</text>
                    </div>
                </div>
                <!-- xclose -->
                <div v-if="opts.xclose" class="unipop__xclose" @tap="close"></div>
            </div>
        </div>
    </div>
</template>

<script>
	data() {
	    return {
	        defaultOptions: {
	            isVisible: false,       //是否显示弹窗
	            
	            title: '',              //标题
	            content: '',            //内容
	            contentStyle: '',       //内容样式
	            style: null,            //自定义弹窗样式
	            skin: '',               //弹窗风格
	            icon: '',               //弹窗图标
	            xclose: false,          //自定义关闭按钮
	            
	            shade: true,            //遮罩层
	            shadeClose: true,       //点击遮罩关闭
	            opacity: '',            //遮罩透明度
	            time: 0,                //自动关闭秒数
	            end: null,              //销毁弹窗回调函数
	            
	            anim: 'scaleIn',        //弹窗动画  scaleIn(默认) | fadeIn | shake | top | right | bottom | left
	            position: '',           //弹窗位置  top | right | bottom | left
	            
	            btns: null,             //弹窗按钮
	        },
	        opts: {},
	        timer: null
	    }
	},
	methods: {
	    // 显示弹窗事件（处理传参）
	    show(args) {
	        this.opts = Object.assign({}, this.defaultOptions, args, {isVisible: true})
	        
	        // 自动关闭
	        if(this.opts.time) {
	            this.timer = setTimeout(() => {
	                this.close()
	            }, this.opts.time * 1000)
	        }
	    }
	}
</script>

<style>
</style>
