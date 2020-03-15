<template>
	<div class="content">
		<div class="con_head con_item">
			{{page_title}}
		</div>
		<div class="con_body con_item">
			<div class="con_menu_body con_item_list">
			   
			</div>
			<div class="con_card_body con_item_list">
				<div class="card_con_body">
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
				</div>
			</div>
			<div class="fun_body">
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
			</div>
			<div class="other_fun_body">
				<div class="oth_fun_item">
					<button class="oth_fun_btn" @click="addPhone()">存手机</button>
				</div>
				<div class="oth_fun_item">
					<button class="oth_fun_btn" open-type="share">转发</button>
				</div>
				<div class="oth_fun_item">
					<button class="oth_fun_btn" @click="saveCardList()">收藏</button>
				</div>
				<div class="oth_fun_item">
					<button class="oth_fun_btn" @click="saveEwm()">二维码</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				page_title: '珠海大横琴科技发展有限公司',
				login_show:true,
				pers_card_msg:{
				}
			}
		},
		onLoad(options){
			if(options.card){
				this.pers_card_msg=JSON.parse(unescape(options.card))
			}else if(options.id){
				let _this=this
				for(var i in _this.card_list){
					if(_this.card_list[i].id+""===options.id){
						_this.pers_card_msg=_this.card_list[i]
						break
					}
				}
			}else{
				
			}
		},
		onShow(){
			// if(requirePlugin('chooseLocation').getLocation()){
			// 	let location =requirePlugin('chooseLocation').getLocation();
			// 	uni.showModal({
			// 		content:JSON.stringify(location)
			// 	})
			// }
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮
		      console.log(res.target)
		    }
			let tname=this.pers_card_msg.name,id=this.pers_card_msg.id
		    return {
		      title: tname,
		      path: '/pages/card_desc/index?id='+id
		    }
		},
		computed: {
			
		},
		methods: {
			getLogoUrl(){
				return this.pers_card_msg.logo
			},
			callCardPNo(no){
				if(no){
					uni.makePhoneCall({
					    phoneNumber: no
					});
				}
			},
			addPhone(){
				if(this.pers_card_msg.pho_no){
					let nickName=this.pers_card_msg.name,
					mobilePhoneNumber=this.pers_card_msg.pho_no,
					lastName=nickName.substring(1,nickName.length),
					firstName=nickName.substring(0,1)
					uni.addPhoneContact({
					    nickName: nickName,
					    lastName: lastName,
					    firstName: firstName,
					    remark: '',
					    mobilePhoneNumber: mobilePhoneNumber,
					    weChatNumber: '',
					    success: function () {
					        console.log('success');
					    },
					    fail: function () {
					        console.log('fail');
					    }
					});
				}
			},
			toLocation(){  //2. 获取地理位置
				var _this=this;
				try{
					let laddr,wkey,referer;
					laddr=_this.pers_card_msg.addr;
					referer='快享电名'
					wkey='UVTBZ-Y7JCK-XYGJU-AYUFD-QXRAF-LRF3N'
					uni.getLocation({
						type: 'wgs84',
						success (res) {
							let latitude,longitude;
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
				}catch(e){
					uni.showModal({
						content:e.toString()
					})
				}
			},
			isGetLocation(){ // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var _this=this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting["scope.userLocation"]) {  //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							uni.authorize({
								scope: "scope.userLocation",
								success() { //1.1 允许授权
									_this.toLocation();
								},
								fail(){    //1.2 拒绝授权
									console.log("你拒绝了授权，无法获得周边信息")
								}
							})
						}else{
							_this.toLocation()
						}
					}
				});
			},
			saveCardList(){
				
			},
			saveEwm(e){
				//获取相册授权
				let _this=this
				uni.getSetting({
					success(res) {
					    if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.authorize({
								scope: 'scope.writePhotosAlbum',
								success() {
									//这里是用户同意授权后的回调
									_this.shareToWeixin("WXSceneSession");
								},
								fail() {//这里是用户拒绝授权后的回调
								
								}
							 })
					   } else {//用户已经授权过了
						    _this.shareToWeixin("WXSceneSession");
					   }
					}
				})
			},
			saveImgToLocal(e){
				uni.showModal({
					title: '提示',
					content: '确定保存到相册吗',
					success: function (res) {
						if (res.confirm) {
							uni.downloadFile({
								url:"",//图片地址
								success: (res) =>{
									if (res.statusCode === 200){
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
			},
			shareToWeixin(scene) {
				uni.chooseImage({
				  count: 1,
				  sizeType: ['compressed'],
				  sourceType: ['album'],
				  success: (res) => {
					uni.showToast({
						title: '选择成功！'
					})
					uni.share({
					  provider: 'weixin',
					  type: 2,
					  title: 'app微信分享测试',
					  scene: scene,
					  imageUrl: res.tempFilePaths[0],
					  success: (res) => {
						// console.log(res)
						uni.showToast({
						  title: '分享成功！'
						})
					  },
					  fail: (err) => {
						// console.log(err)
					  }
					})
				  }
				})   
			}
		}
	}
</script>

<style lang="scss">
	.content {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 999;
		text-align: center;
		display: flex;
		flex-direction: column; 
		background-color: #F8F8F8;
	}
	
	.con_item{
		flex:180upx 0;
	}
	
	.con_head{
		display: none;
		height: 180upx;
		line-height:180upx;
		font-size: 45upx;
		color: #FFFFFF;
		text-align: left;
	}
	.con_body{
		height:auto;
		display: flex;
		flex-direction: column; 
	}
	.con_item_list{
		flex:150upx 0;
	}
	.con_menu_body{
		display: none;
	}
	.con_card_body{
		background-color: #F8F8F8;
		padding: 50upx 20upx 30upx 20upx;
	}
	.card_con_body{
		height: auto;
		background-color: #FFFFFF;
		border-radius:8px ;
		color: #333333;
		padding: 25upx 20upx;
	}
	
	.img_name_edu_body{
		display: flex;
		height: auto;
	}
	
	.ine_item{
		height: 70upx;
		flex: 1 ; 
	}
	
	.ine_item_img{
		flex: 0 0 80upx ; 
	}
	
	.ine_item_name{
		flex: 0 0 150upx ; 
	}
	
	.pers_img img{
		height: 70upx;
		width: 70upx;
		border-radius: 35upx;
	}
	
	.pers_name{
		line-height: 70upx;
		font-size: 38upx;
		font-weight: bold;
		color: #000;
	}
	
	.pers_edu{
		line-height: 80upx;
		text-align: left;
		font-size: 30upx;
		font-weight: bold;
	}
	
	.pos_body{
		padding: 20upx 0;
		height: auto;
	}
	
	.pers_pos{
		height:35upx;
		font-size: 25upx;
		text-align: left;
		color: #333333;
		font-weight: bold;
	}
	
	.other_msg_body{
		display: flex;
		flex-wrap:wrap;
		flex-flow:center;
		justify-content:center;
		align-content: flex-start;
	}
	
	.other_msg_item{
		flex: 0 0 50%;
		box-sizing: border-box;
		font-size:24upx ;
		text-align: left;
		/* font-weight: bold; */
		padding: 0 10upx 0 0;
	}
	
	.fun_body{
		padding:0upx 20upx ;
		.card_fun_body{
			margin-top: 20upx;
			background-color: #FFFFFF;
			height: auto;
			padding:25upx 10upx  0upx 20upx;
			border-radius: 8upx;
			.card_fun_item{
				display: flex;
				box-sizing: border-box;
				height: 100upx;
				padding-top:15upx ;
				font-size: 28upx;
				.fun_item{
					flex: 1;
				}
				.fun_item_l{
					flex: 0 0 120upx;
					color: #999;
					font-weight: bold;
					text-align: left;
				}
				.fun_item_c{
					color: #222222;
					font-weight: bold;
					text-align: left;
					padding-left: 20upx;
				}
				.fun_item_r{
					flex: 0 0 200upx;
					.fun_btn{
						margin:-8upx auto;
						width: 80%;
						height: 60upx;
						line-height: 60upx;
						font-size: 26upx;
						border: 1px solid #3b7aff;
						border-radius:3px ;
						background-color: #FFFFFF;
						color: #3b7aff;
						font-weight: bold;
					}
				}
			}
		}
	}
	
	.other_fun_body{
		height: auto;
		display: flex;
		flex-wrap:wrap;
		flex-flow:center;
		justify-content:center;
		align-content: flex-start;
		padding:20upx 30upx  0upx 30upx;
		.oth_fun_item{
			flex: 0 0 25%;
			box-sizing: border-box;
			padding:20upx 15upx;
			.oth_fun_btn{
				border: 1px solid #3b7aff;
				border-radius:5px ;
				font-size: 28upx;
				background-color: #FFFFFF;
				color: #3b7aff;
				font-weight: bold;
			}
		}
	}	
	
</style>
