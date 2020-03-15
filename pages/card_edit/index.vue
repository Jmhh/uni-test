<template>
	<view>
		<view class="card-edit-form">
			<form @submit="formSubmit" @reset="formReset">
				<view class="uni-form-item card-column">
					<view class="title">姓名</view>
					<input class="uni-input" name="userName" v-model="pers_card_msg.userName" placeholder="请输入姓名" />
				</view>
				<view class="uni-form-item card-column">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="title">学位</view>
							<view class="uni-list-cell-db">
								<picker mode="selector" style="height: 30upx;" @change="bindPickerChange" :value="eduIndex" :range="eduArray">
									<view class="uni-input">{{eduArray[eduIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item card-column">
					<view class="title">职称</view>
					<view class="postListItem" v-for="(item,index) in postList" :key="index">
						<input class="uni-input"  v-model="item.companyName"  placeholder="请输入公司/部门名称" />
						<input class="uni-input"  v-model="item.postName"  placeholder="请输入职位" />
					</view>
					<button class="mini-btn addPost" @click="addPost" type="primary" size="mini">添加</button>
					</view>
				<view class="uni-form-item card-column">
				    <view class="title">地址</view>
				    <input class="uni-input" name="address" v-model="pers_card_msg.address" placeholder="请输入地址" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">邮箱</view>
				    <input class="uni-input" name="email" v-model="pers_card_msg.email" placeholder="请输入邮箱" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">网址</view>
				    <input class="uni-input" name="website" v-model="pers_card_msg.website" placeholder="请输入固话号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">邮编</view>
				    <input class="uni-input" name="postalCode" v-model="pers_card_msg.postalCode" placeholder="请输入固话号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">手机号</view>
				    <input class="uni-input" name="mobile" v-model="pers_card_msg.mobile" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">固话号</view>
				    <input class="uni-input" name="tel" v-model="pers_card_msg.tel" placeholder="请输入固话号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">头像</view>
						<view class="uni-padding-wrap uni-common-mt">
							<view class="demo">
								<block v-if="pers_card_msg.headImg">
									<image :src="pers_card_msg.headImg" class="image-edit" mode="widthFix"></image>
								</block>
								<block>
									<view class="uni-hello-addfile" @click="chooseImage('headImg')">+ 选择图片</view>
								</block>
							</view>
						</view>
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">背景图片</view>
						<view class="uni-padding-wrap uni-common-mt">
							<view class="demo">
								<block v-if="pers_card_msg.bgImg">
									<image :src="pers_card_msg.bgImg" class="image-edit" mode="widthFix"></image>
								</block>
								<block>
									<view class="uni-hello-addfile" @click="chooseImage('bgImg')">+ 选择图片</view>
								</block>
							</view>
						</view>
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">背景图</view>
				    <div class="bgImg"></div>
				</view>
                <view class="card-btn-v">
                    <button  form-type="submit">提交</button>
                    <button type="default" form-type="reset">重置</button>
                </view>
            </form>
        </view>
    </view>
</template>
<script>
    export default {
        data() {
            return {
				pers_card_msg:{
				},
				eduIndex: 0,
				eduArray: ['博士后', '博士', '硕士', '学士'],
				postList: [
					{
						companyName: '',
						postName: ''
					}
				],
				imageSrc: ''
            }
        },
		onLoad(options){
			this.imageSrc = '';
			if(options.card){
				this.pers_card_msg=JSON.parse(unescape(options.card))
				console.log(this.pers_card_msg)
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
			if(this.pers_card_msg.postList.length>0) {
				this.postList = this.pers_card_msg.postList
			}
			this.eduIndex = this.eduArray.indexOf(this.pers_card_msg.degree)
		},
        methods: {
			bindPickerChange: function(e) {
			    this.eduIndex = e.target.value
			},
			addPost() {
				this.postList.push({
					companyName: '',
					postName: ''
				})
			},
            formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
				formdata.id = this.pers_card_msg.id 
				formdata.headImg = this.pers_card_msg.headImg 
				formdata.bgImg = this.pers_card_msg.bgImg 
				formdata.degree = this.eduArray[this.eduIndex]
				
				this.postList.forEach(item => {
					if(!item.userId)item.userId = '5s5ge52xg1a3g'
				})
				formdata.postList = this.postList
				console.log(formdata)
				
                // uni.showModal({
                //     content: '表单数据内容：' + JSON.stringify(formdata),
                //     showCancel: false
                // });
				
				this.$api.updateUserInfo(formdata).then(res => {
					console.log(res)
					uni.showToast({
						title: '更新成功',
						icon: 'success',
						duration: 1000
					})
				}).catch(errors => {
					uni.showModal({
						title: '更新失败',
						content: errors,
						showCancel: false
					});
				  })
            },
            formReset: function(e) {
                console.log('清空数据')
            },
			chooseImage: function(e) {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album'],
					success: (res) => {
						//console.log('chooseImage success, temp path is', res)
						var imageSrc = res.tempFilePaths[0]
						uni.uploadFile({
							url: 'http://121.201.18.34:8090/api/file/upload',
							filePath: imageSrc,
							fileType: 'image',
							name: 'file',
							header: {
							  "Content-Type": "application/x-www-form-urlencoded"
							}, 
							success: (res) => {
								console.log('uploadImage success, res is:', res)
								uni.showToast({
									title: '上传成功',
									icon: 'success',
									duration: 1000
								})
								this.pers_card_msg[e] = imageSrc
							},
							fail: (err) => {
								console.log('uploadImage fail', err);
								uni.showModal({
									content: err.errMsg,
									showCancel: false
								});
							}
						});
					},
					fail: (err) => {
						console.log('chooseImage fail', err)
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.album'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要从您的相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			}
        }
    }
</script>

<style lang="scss">
    .uni-form-item .title {
        padding: 20upx 0;
    }
	.card-edit-form {
		padding: 30upx;
		background-color: #F8F8F8;
		.uni-list-cell-db {
			background-color: #fff;
			padding: 15rpx 10rpx;
			font-size: 30rpx;
		}
	}
	.card-column {
		.title {
			font-size: 30upx;
		}
		input {
			line-height: 30upx;
			height: 30upx;
			padding: 5upx 10upx;
			font-size: 30upx;
			background-color: #fff;
		}
	}
	.card-btn-v {
		margin-top: 30upx;
		button {
			margin-bottom: 20upx;
		}
	}
	.postListItem {
		display: flex;
		margin-bottom: 10upx;
	}
	.demo {
		background: #FFF;
		padding: 50upx;
	}
	image.image-edit {
		width: 100%;
		.uni-hello-addfile {
			text-align: center;
		}
	}
</style>
