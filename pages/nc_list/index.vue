<template>
	<div class="content">
		<div class="search_body">
			<div class="search_input_box">
				<input class="search_input" type="text" placeholder="搜索" v-model="search_val" @blur="card_search()"/>
			</div>
		</div>
		<div class="sear_relt_body">
			<div rel="relt_list" class="relt_list" v-if="is_card_list">
				<div class="list_item" v-for="(item,index) in card_list_show" :key="index" @click="openCardMsg(item)">
					<div class="card_id hide">{{item.id}}</div>
					<div class="dec_item card_img" v-if="item.headImg"><image class="cradImg" :src="item.headImg"></image></div>
					<div class="dec_item card_dec">
						<div class="card_name">{{item.userName}}</div>
						<div class="card_post">{{item.degree}}</div>
						<div class="card_company">{{item.address}}</div>
					</div>
					<div class="dec_item card_oper"><span class="oper_btn">...</span></div>
				</div>
			</div>
			<div class="more_btn">
			 
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title: '名片夹',
				search_val:"",
				is_card_list:true,
				card_list_show:[],
				card_list:[]
			}
		},
		onLoad() {
			let isCanUse=uni.getStorageSync('isCanUse')
			if(isCanUse=="100"){
				//this.getCardList()
				this.$api.getUserList('5s5ge52xg1a3g').then(res => {
					let rult = res.data
					this.card_list_show = rult
					// if(rult.length === 0) {
					// 	console.log('没数据')
					// 	this.$api.getUserSearch('5s5ge52xg1a3g')
					// }
				})
			}
		},
		onShow(){
			let isCanUse=uni.getStorageSync('isCanUse')
			if(isCanUse=="100"){
				//this.getCardList()
			}
		},
		methods: {
			card_search(){
				let isCanUse=uni.getStorageSync('isCanUse')
				if(isCanUse=="100"){
					if(this.search_val===""){
						this.getCardList()
						return false
					}
					let str=JSON.stringify(this.search_val)
					console.log(str)
					this.$api.getUserSearch('5s5ge52xg1a3g',str)
					// if(relt){
					// 	this.is_card_list=false
					// 	this.card_list_show=[]
					// 	this.card_list_show=relt
					// 	this.is_card_list=true
					// }
				}
			},
			getCardList(){
				let str=JSON.stringify(this.card_list)
				this.card_list_show=JSON.parse(str)  
			},
			getCardListForSear(){
				let relt=[],search_val=this.search_val
				if(search_val!=""){
					let list=this.card_list
					for(let i in list){
						if(list[i].name.indexOf(search_val)>-1||list[i].company_name.indexOf(search_val)>-1){
							relt.push(list[i])
						}
					}
				}
				return relt
			},
			openCardMsg(obj){
				console.log(obj)
				try{
					uni.navigateTo({
					    url:'../card_desc/index?card='+escape(JSON.stringify(obj)),
						success:function(){
							
						},
						fail:function(e){
							console.log(e)
						}
					});
				}catch(e){
					//TODO handle the exception
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		text-align: center;
		height: auto;
		display: flex;
		flex-direction: column; 
		background-color: #FFFFFF;
	 }
	 .search_body{
		padding: 30rpx 0rpx;
		border-bottom: 1px solid #F1F1F1;
		position: fixed;
		z-index: 999;
		width: 100%;
		background-color: #fff;
	 }
	 .search_input_box{
		height: 60rpx;
		border-radius: 6px;
		background-color: #F8F8F8;
		margin: 0 auto;
		width: 95%;
	 }
	 .search_input{
		height: 60upx;
	 }
	 .sear_relt_body{
		 margin-top:136upx ;
		height: auto;
	 }
	 .relt_list{
		height: auto;
	 }
	 .list_item{
		display: flex;
		background-color: #FFFFFF;
		border-bottom: 1px solid #F1F1F1;
		padding:15upx 25upx ;
	 }
	.dec_item{
		flex: 1;
	}
	.card_img{
		text-align: left;
		padding: 8upx;
		flex:0 0 120upx;
		image {
			width: 100upx;
			height: 100upx;
		}
	}
	.card_img img{
		width: 95upx;
		height: 95upx;
		border-radius: 15upx;
	}
	.card_dec{
		text-align: left;
		color: #999999;
		font-size: 24upx;
		.card_name{
			color: #333333;
			font-weight: bold;
			font-size: 30upx;
		}
	}
	.card_oper{
		text-align: center;
		flex:0 0 100upx;
		.oper_btn{
			display: inline-block;
			font-weight: bold;
			color: #999999;
			padding-top: 28upx;
		}
	}
	.hide{
		display: none;
	}
</style>
