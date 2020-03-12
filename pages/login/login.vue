<template>
	<div class="login_confirm">
		<div class="l_c_body">
			<div class='header'>
			   <image src='../../static/img/pers_logo/denglb_logo.png'></image>
			</div>
			<div class="cfm_title">授权登录</div>
			<div class='content'>
			   获得你的公开信息(昵称，头像、地区等)
			</div>
			<button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
			   允许
			</button>
		</div>
	</div> 
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {
			wxGetUserInfo() {
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						try {
							uni.setStorageSync('isCanUse',"100");//记录是否第一次授权  100:表示不是第一次授权
							uni.redirectTo({url:"../index/index"})
							//_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			login(){
				let _this = this;
				uni.showLoading({
					title: '登录中...'
				});
				//1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						console.log(code)
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.login_confirm{
		position:absolute;
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
		z-index: 99;
		text-align: center;
		.l_c_body{
			background-color: #FFFFFF;
			padding: 50upx 10px;
			border-radius: 15upx;
			width: 560upx;
			margin: 180upx auto;
			text-align: center;
			.header {
				// border-bottom: 1px solid #ccc;
				text-align: center;
				height: 120upx;
				line-height: 180upx;
			}
			.header image {
				width: 100upx;
				height: 100upx;
				border-radius: 50upx;
			}
			.cfm_title{
				color: #333;
				font-size: 36upx;
				font-weight: bold;
				padding: 0 0 50upx 0;
			}
			.content {
				color: #9d9d9d;
			}
			.bottom {
				background-color:#3b7aff;
				color: #FFFFFF;
				border-radius: 80rpx;
				margin: 50rpx 20rpx;
				font-size: 35rpx;
				font-weight: bold;
			}
		}
	}
</style>
