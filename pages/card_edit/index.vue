<template>
    <view>
        <view class="card-edit-form">
            <form @submit="formSubmit" @reset="formReset">
                <view class="uni-form-item card-column">
                    <view class="title">姓名</view>
                    <input class="uni-input" name="name" v-model="user.name" placeholder="请输入姓名" />
                </view>
				<view class="uni-form-item card-column">
					<view class="uni-list">
						<view class="uni-list-cell">
							<view class="title">学位</view>
							<view class="uni-list-cell-db">
								<picker mode="selector" @change="bindPickerChange" :value="eduIndex" :range="eduArray">
									<view class="uni-input">{{eduArray[eduIndex]}}</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">职称</view>
				    <textarea class="card-textarea" auto-height  v-model="user.pos" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">地址</view>
				    <input class="uni-input" name="addr" v-model="user.addr" placeholder="请输入地址" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">邮箱</view>
				    <input class="uni-input" name="email" v-model="user.e_mail" placeholder="请输入邮箱" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">网址</view>
				    <input class="uni-input" name="webs" v-model="user.webs" placeholder="请输入固话号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">邮编</view>
				    <input class="uni-input" name="zip_code" v-model="user.zip_code" placeholder="请输入固话号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">手机号</view>
				    <input class="uni-input" name="pho_no" v-model="user.pho_no" placeholder="请输入手机号" />
				</view>
				<view class="uni-form-item card-column">
				    <view class="title">固话号</view>
				    <input class="uni-input" name="tel_no" v-model="user.tel_no" placeholder="请输入固话号" />
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
				user: {
					name: '',
					edu: '',
					pos: '',
					addr: '',
					e_mail: '',
					webs: '',
					zip_code: '',
					pho_no: '',
					tel_no: ''
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
			this.user = {...this.pers_card_msg}
			this.eduIndex = this.eduArray.indexOf(this.user.edu)
		},
        methods: {
			bindPickerChange: function(e) {
			            console.log('picker发送选择改变，携带值为', e.target.value)
			            this.eduIndex = e.target.value
			},
            formSubmit: function(e) {
                console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
                var formdata = e.detail.value
                uni.showModal({
                    content: '表单数据内容：' + JSON.stringify(formdata),
                    showCancel: false
                });
            },
            formReset: function(e) {
                console.log('清空数据')
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
			padding: 5rpx 10rpx;
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
	.card-textarea {
		background-color: #fff;
		padding: 20upx;
		font-size: 30upx;
	}
	button {
		border-radius:5upx;
		font-size: 28upx;
		font-weight: bold;
	}
</style>