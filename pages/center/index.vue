<template>
	<div class="content">
		<div class="con_head">
			{{page_title}}
		</div>
       <!-- <img class="logo" src="../../static/logo.png"></img>
		<div>
            <text class="title">{{title}}</text>
        </div> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page_title: '珠海大横琴科技发展有限公司'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
	.con_head{
		height: 200upx;
		font-size: 50upx;
		background-color: #3b7aff;
		color: #FFFFFF;
	}
    .logo{
        height: 200upx;
        width: 200upx;
       /* margin-top: 200upx; */
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
