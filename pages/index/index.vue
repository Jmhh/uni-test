<template>
	<div class="content">
		<div class="con_head con_item">
			{{page_title}}
		</div>
		<div class="con_body con_item">
			<div class="con_menu_body con_item_list">

			</div>
			<div class="con_card_body con_item_list">
				<div class="card_con_body bgimg" :style="{background: 'url('+bgImageURL+') no-repeat'}">
					<button v-if="login_show" class='bottom' type='primary' @click="login" open-type="getUserInfo" withCredentials="true"
					 lang="zh_CN" @getuserinfo="wxGetUserInfo">
						登录
					</button>
					<!-- <button v-if="login_show"  class='bottom' open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber">登录</button> -->
					<div class="img_name_edu_body">
						<div class="pers_img ine_item ine_item_img">
							<img :src="pers_card_msg.headImg" />
						</div>
						<div class="pers_name ine_item ine_item_name">{{pers_card_msg.userName}}</div>
						<div class="pers_edu ine_item">{{pers_card_msg.degree}}</div>
					</div>
					<div class="pos_body">
						<div class="pers_pos" v-for="(item,index) in pers_card_msg.postList" :key="index">
							{{item.companyName}} {{item.postName}}
						</div>
					</div>
					<div class="other_msg_body">
						<div class="other_msg_item" v-if="pers_card_msg.address">
							地址: {{pers_card_msg.address}}
						</div>
						<div class="other_msg_item" v-if="pers_card_msg.email">
							邮箱: {{pers_card_msg.email}}
						</div>
					</div>
				</div>
				<div class="card_fun_body">
					<div class="card_fun_item">
						<div class="fun_item fun_item_l">手机号</div>
						<div class="fun_item fun_item_c">{{pers_card_msg.mobile}}</div>
						<div class="fun_item fun_item_r"><button class="fun_btn" @click="callCardPNo(pers_card_msg.mobile)">拨&nbsp打</button></div>
					</div>
					<div class="card_fun_item">
						<div class="fun_item fun_item_l">固话号</div>
						<div class="fun_item fun_item_c">{{pers_card_msg.tel}}</div>
						<div class="fun_item fun_item_r"><button class="fun_btn" @click="callCardPNo(pers_card_msg.tel)">拨&nbsp打</button></div>
					</div>
					<div class="card_fun_item">
						<div class="fun_item fun_item_l">地址</div>
						<div class="fun_item fun_item_c">{{pers_card_msg.address}}</div>
						<div class="fun_item fun_item_r"><button class="fun_btn" @click="isGetLocation()">导&nbsp航</button></div>
					</div>
					<div class="card_fun_item">
						<div class="fun_item fun_item_l">官网</div>
						<div class="fun_item fun_item_c">{{pers_card_msg.website}}</div>
						<div class="fun_item fun_item_r"><button class="fun_btn" @click="routerWebs(pers_card_msg.website)">进&nbsp入</button></div>
					</div>
				</div>
				<div class="other_fun_body">
					<div class="oth_fun_item">
						<button class="oth_fun_btn" @click="editCard()">编辑</button>
					</div>
					<div class="oth_fun_item">
						<button class="oth_fun_btn" @click="collectCard()">收藏</button>
					</div>
					<div class="oth_fun_item">
						<button class="oth_fun_btn" @click="saveEwm()">二维码</button>
					</div>
					<div class="oth_fun_item">
						<button class="oth_fun_btn" open-type="share">转发</button>
					</div>
				</div>
			</div>
		</div>
		<view class="qrimg" style="visibility:hidden;">
			<tki-qrcode ref="qrcode" :val="routerUrl" :size="200" :loadMake="loadMake" loadingText="二维码生成中" @result="qrR" />
		</view>
		<div class="login_confirm" v-if="is_login">
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
	</div>
</template>

<script>
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import {
		config
	} from '../../config.js'
	export default {
		data() {
			return {
				page_title: '珠海大横琴科技发展有限公司',
				login_show: true,
				pers_card_msg: {},
				bgImageURL: '',
				routerUrl: ''
			}
		},
		components: {
			tkiQrcode
		},
		onLoad(options) {
			uni.removeStorageSync('isCanUse')
			this.isLogin()
			if (options.id) {

			} else {
				//this.pers_card_msg=this.card_list[1];
				let nickName = uni.getStorageSync('nickName')
				//this.pers_card_msg=this.getLoginCardMsg(nickName)
			}
			var pages = getCurrentPages();
			this.routerUrl = config.base_url + '/' + pages[0].route;
		},
		onShow() {
			//this.getCardMsg();
			// if (requirePlugin('chooseLocation').getLocation()) {
			// 	let location = requirePlugin('chooseLocation').getLocation();
			// 	uni.showModal({
			// 		content: JSON.stringify(location)
			// 	})
			// }
		},
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				console.log(res.target)
			}
			let tname = this.pers_card_msg.name,
				id = this.pers_card_msg.id
			return {
				title: tname,
				path: '/pages/card_desc/index?id=' + id
			}
		},
		computed: {

		},
		methods: {
			getPhoneNumber(e) {
				console.log(e)
				if (e.detail.errMsg == "getPhoneNumber:ok") {
					console.log(e)
				}
			},
			isLogin() { ///登录显示控制
				let isCanUse = uni.getStorageSync('isCanUse')
				if (isCanUse == "100") {
					this.login_show = false
				}
			},
			operFunOk() { ///判定是否已经登录
				let isCanUse = uni.getStorageSync('isCanUse')
				if (isCanUse == "100")
					return true
				uni.showToast({
					title: "请先登录"
				})
				return false
			},
			wxGetUserInfo(refs) { ///用户认证通过后相关操作
				console.log(refs)
				if (!refs.detail.iv) {
					return false;
				} else {
					uni.setStorageSync('isCanUse', "100")
					uni.setStorageSync('nickName', refs.detail.userInfo.nickName)
					this.login_show = false
					//this.pers_card_msg=this.getLoginCardMsg(refs.detail.userInfo.nickName)
				}
			},
			getThisUserInfo() { ///获取用户信息
				let _this = this;
				uni.getUserInfo({
					provider: 'weixin',
					success: function(infoRes) {
						let nickName = infoRes.userInfo.nickName; //昵称
						let avatarUrl = infoRes.userInfo.avatarUrl; //头像
						try {
							//uni.setStorageSync('isCanUse',"100");//记录是否第一次授权  100:表示不是第一次授权
							//_this.updateUserInfo();
						} catch (e) {}
					},
					fail(res) {}
				});
			},
			getLoginCardMsg(nickName) { ///通过昵称获取用户信息  用于前端测试  实际通过用户登录获取用户的信息
				let rlt = []
				for (var i in this.card_list) {
					if (this.card_list[i].nickName === nickName) {
						rlt = this.card_list[i]
						break;
					}
				}
				return rlt
			},
			login() { ////用户登录方法
				var _this = this;
				uni.getSetting({
					success(res) {
						if (res.authSetting['scope.userInfo']) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							_this.getThisUserInfo()
						} else {
							uni.showModal({ //弹出提示框
								title: '是否打开设置页？',
								content: '需要在设置中获取用户信息和用户权限',
								success(res) {
									if (res.confirm) {
										uni.openSetting({
											// 确认后打开设置页面
											success(res) {
												console.log(res.authSetting)
											},
										})
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					}
				});

				// let _this = this;
				// uni.showLoading({
				// 	title: '登录中...'
				// });
				//1.wx获取登录用户code
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let code = loginRes.code;
						//_this.$api.login({jsCode: code})
						_this.$api.getUserInfo('5s5ge52xg1a3g').then(res => {
							console.log(res)
							_this.pers_card_msg = res.data
							if (res.data.bgImg) {
								_this.bgImageURL = res.data.bgImg
							}

						})
						console.log(code)
					}
				});
			},
			getLogoUrl() { ////设置用户的logo
				return this.pers_card_msg.logo
			},
			callCardPNo(no) { ////拨打电话方法
				if (!this.operFunOk()) {
					return
				}
				if (no) {
					uni.makePhoneCall({
						phoneNumber: no
					});
				}
			},
			collectCard() {
				let boj = {
					userId: '5s5ge52xg1a3g',
					collectUserId: '5s5ge52xg1a3g'
				}
				this.$api.postUserCollect(boj)
			},
			addPhone() { ////添加联系人
				if (!this.operFunOk()) {
					return
				}
				let nickName = this.pers_card_msg.name,
					mobilePhoneNumber = this.pers_card_msg.pho_no,
					lastName = nickName.substring(1, nickName.length),
					firstName = nickName.substring(0, 1)
				uni.addPhoneContact({
					nickName: nickName,
					lastName: lastName,
					firstName: firstName,
					remark: '',
					mobilePhoneNumber: mobilePhoneNumber,
					weChatNumber: '',
					success: function() {
						console.log('success');
					},
					fail: function() {
						console.log('fail');
					}
				});
			},
			toLocation() { // 获取地理位置
				if (!this.operFunOk()) {
					return
				}
				var _this = this;
				try {
					let laddr, wkey, referer;
					laddr = _this.pers_card_msg.addr;
					referer = '快享电名'
					wkey = 'UVTBZ-Y7JCK-XYGJU-AYUFD-QXRAF-LRF3N'
					uni.getLocation({
						type: 'wgs84',
						success(res) {
							let latitude, longitude;
							latitude = res.latitude.toString();
							longitude = res.longitude.toString();
							//const key = ''; //使用在腾讯位置服务申请的key
							//const referer = ''; //调用插件的app的名称
							const location = JSON.stringify({
								latitude: latitude,
								longitude: longitude
							});
							//const category = '工作服务';
							//let plugin = requirePlugin('chooseLocation')
							wx.navigateTo({
								url: `plugin://chooseLocation/index?key=${wkey}&referer=${referer}&location=${location}`
							});
						}
					});
				} catch (e) {
					uni.showModal({
						content: e.toString()
					})
				}
			},
			isGetLocation() { // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this = this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting["scope.userLocation"]) { //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							uni.authorize({
								scope: "scope.userLocation",
								success() { //1.1 允许授权
									_this.toLocation();
								},
								fail() { //1.2 拒绝授权
									console.log("你拒绝了授权，无法获得周边信息")
								}
							})
						} else {
							_this.toLocation()
						}
					}
				});
			},
			routerWebs(e) {
				uni.navigateTo({
					url: `/pages/web_page/index?url=${e}`
				})
			},
			editCard() { //编辑自己的名片信息
				if (!this.operFunOk()) {
					return
				}
				uni.navigateTo({
					url: '../card_edit/index?card=' + escape(JSON.stringify(this.pers_card_msg)),
					success: function() {

					},
					fail: function(e) {
						console.log(e)
					}
				});
			},
			saveEwm(e) { ///将用户的二维码保存在自己的相册中
				//获取相册授权
				let _this = this
				this.$refs.qrcode._makeCode()

				// // 生成页面的二维码
				// uni.request({
				// 	//注意：下面的access_token值可以不可以直接复制使用，需要自己请求获取
				// 	url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=31_W6Z19by4SH7EyRxX4Ez4WRLc-NtbtcjMmhfJkcfb_brBfwXwegZNhKXJdI6CbxcpL4YtZi0AZNKDwJdkgPVwRMMHm4kNTqNz6yHgOQGH5L9__iDMHSTe-TjUaAsQtspqM9kjmMgS3tHkHHc1GVLjAHAPEU',
				// 	data: {
				// 		scene: '000',
				// 		page: "" //这里按照需求设置值和参数   
				// 	},
				// 	method: "POST",
				// 	responseType: 'arraybuffer', //设置响应类型
				// 	success(res) {
				// 		console.log(res)
				// 		var src2 = uni.arrayBufferToBase64(res.data); //对数据进行转换操作
				// 		console.log(src2)
				// 	},
				// 	fail(e) {
				// 		console.log(e)
				// 	}
				// })
				// uni.getSetting({
				// 	success(res) {
				// 	    if (!res.authSetting['scope.writePhotosAlbum']) {
				// 			uni.authorize({
				// 				scope: 'scope.writePhotosAlbum',
				// 				success() {
				// 					//这里是用户同意授权后的回调
				// 					_this.shareToWeixin("WXSceneSession");
				// 				},
				// 				fail() {//这里是用户拒绝授权后的回调

				// 				}
				// 			 })
				// 	   } else {//用户已经授权过了
				// 		    _this.shareToWeixin("WXSceneSession");
				// 	   }
				// 	}
				// })
			},
			qrR(res) {
				console.log(res)
				this.$refs.qrcode._saveCode()
			},
			saveImgToLocal(e) {
				if (!this.operFunOk()) {
					return
				}
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function(res) {
						if (res.confirm) {
							uni.downloadFile({
								url: "", //图片地址
								success: (res) => {
									if (res.statusCode === 200) {
										uni.saveImageToPhotosAlbum({
											filePath: res.tempFilePath,
											success: function() {
												uni.showToast({
													title: "保存成功",
													icon: "none"
												});
											},
											fail: function() {
												uni.showToast({
													title: "保存失败",
													icon: "none"
												});
											}
										});
									}
								}
							})
						} else if (res.cancel) {

						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		width: 100%;
		min-height: 100%;
		z-index: 999;
		text-align: center;
		display: flex;
		flex-direction: column;
		background-color: #F8F8F8;
	}

	.con_item {
		flex: 180upx 0;
	}

	.con_head {
		height: 180rpx;
		line-height: 180rpx;
		font-size: 45rpx;
		color: #FFFFFF;
		background-color: #69c1ef;
	}

	.con_body {
		height: auto;
		display: flex;
		flex-direction: column;
	}

	.con_item_list {
		flex: 150upx 0;
	}

	.con_menu_body {
		display: none;
	}

	.con_card_body {
		background-color: #F8F8F8;
		padding: 30upx 20upx 10upx 20upx;
	}

	.card_con_body {
		height: auto;
		background-color: #FFFFFF;
		border-radius: 8px;
		box-shadow: 0 6px 15px 0 #F5F5F5;
		color: #333333;
		padding: 25upx 20upx;
	}

	.img_name_edu_body {
		display: flex;
		height: auto;
	}

	.ine_item {
		height: 70upx;
		flex: 1;
	}

	.ine_item_img {
		flex: 0 0 80upx;
	}

	.ine_item_name {
		flex: 0 0 150upx;
	}

	.pers_img img {
		height: 70upx;
		width: 70upx;
		border-radius: 35upx;
	}

	.pers_name {
		line-height: 70upx;
		font-size: 38upx;
		font-weight: bold;
		color: #000;
	}

	.pers_edu {
		line-height: 80upx;
		text-align: left;
		font-size: 30upx;
		font-weight: bold;
	}

	.pos_body {
		padding: 20upx 0;
		height: auto;
	}

	.pers_pos {
		height: 35upx;
		font-size: 25upx;
		text-align: left;
		color: #333333;
		font-weight: bold;
	}

	.other_msg_body {
		display: flex;
		flex-wrap: wrap;
		flex-flow: center;
		justify-content: center;
		align-content: flex-start;
	}

	.bgimg {
		background-size: 100% 100%;
	}

	.other_msg_item {
		flex: 0 0 50%;
		box-sizing: border-box;
		font-size: 24upx;
		text-align: left;
		/* font-weight: bold; */
		padding: 0 10upx 0 0;
	}

	.card_fun_body {
		margin-top: 30upx;
		background-color: #FFFFFF;
		height: auto;
		padding: 25upx 10upx 0upx 20upx;
		border-radius: 5px;

		.card_fun_item {
			display: flex;
			box-sizing: border-box;
			height: 100upx;
			padding-top: 15upx;
			font-size: 28upx;

			.fun_item {
				flex: 1;
			}

			.fun_item_l {
				flex: 0 0 120upx;
				color: #999;
				font-weight: bold;
				text-align: left;
			}

			.fun_item_c {
				color: #222222;
				font-weight: bold;
				text-align: left;
				padding-left: 20upx;
			}

			.fun_item_r {
				flex: 0 0 200upx;

				.fun_btn {
					margin: -8upx auto;
					width: 80%;
					height: 60upx;
					line-height: 60upx;
					font-size: 26upx;
					border: 1px solid #3b7aff;
					border-radius: 3px;
					background-color: #FFFFFF;
					color: #3b7aff;
					font-weight: bold;
				}
			}
		}
	}

	.other_fun_body {
		height: auto;
		display: flex;
		flex-wrap: wrap;
		flex-flow: center;
		justify-content: center;
		align-content: flex-start;
		padding: 30upx 20upx 0upx 20upx;

		.oth_fun_item {
			box-sizing: border-box;
			padding: 20upx 20upx;

			.oth_fun_btn {
				border: 1px solid #3b7aff;
				border-radius: 5px;
				font-size: 28upx;
				background-color: #FFFFFF;
				color: #3b7aff;
				font-weight: bold;
			}
		}
	}


	.card_con_body {
		.bottom {
			background-color: #3b7aff;
			color: #FFFFFF;
			border-radius: 80rpx;
			margin: 50rpx 20rpx;
			font-size: 35rpx;
			font-weight: bold;
			width: 60%;
			margin: 20upx auto;
		}
	}

	.login_confirm {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
		z-index: 99;
		text-align: center;

		.l_c_body {
			background-color: #FFFFFF;
			padding: 50upx 10px;
			border-radius: 15upx;
			width: 560upx;
			margin: 260upx auto;
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

			.cfm_title {
				color: #333;
				font-size: 36upx;
				font-weight: bold;
				padding: 0 0 50upx 0;
			}

			.content {
				color: #9d9d9d;
			}

			.bottom {
				background-color: #3b7aff;
				color: #FFFFFF;
				border-radius: 80rpx;
				margin: 50rpx 20rpx;
				font-size: 35rpx;
				font-weight: bold;
			}
		}
	}
</style>
