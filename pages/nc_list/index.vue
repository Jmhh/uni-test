<template>
	<div class="content">
		<div class="search_body">
			<div class="search_input_box">
				<input class="search_input" type="text" placeholder="搜索" v-model="search_val" @blur="card_search()" @confirm="card_search()" @input="card_search()"/>
			</div>
		</div>
		<div class="sear_relt_body">
			<div rel="relt_list" class="relt_list" v-if="is_card_list">
				<div class="list_item" v-for="(item,index) in card_list_show" :key="index" @click="openCardMsg(item)">
					<div class="card_id hide">{{item.id}}</div>
					<div class="dec_item card_img"><img :src="item.logo" /></div>
					<div class="dec_item card_dec">
						<div class="card_name">{{item.name}}</div>
						<div class="card_post">{{item.post}}</div>
						<div class="card_company">{{item.company_name}}</div>
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
				card_list:[
					{
						id:1131311,
						weixin_id:'DLB_666',
						logo:"../../static/img/pers_logo/denglb_logo.png",
						card_bg:"",
						name:"邓练兵",
						nickName: "邓练兵",
						edu:"博士",
						pos:["珠海横琴新区信息中心 主任","横琴新区博士后办公室 主任","珠海大横琴科技发展有限公司 执行董事兼总经理","中国自贸区信息港（横琴）股份有限公司 副董事长","广东琴智科技研究院有限公司 董事长"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"denglb@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"总经理",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"denglb@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1131312,
						weixin_id:"wendell872142378",
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"张文浩",
						nickName: "自转的月球",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 技术中心开发工程师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"zhangwh@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"开发工程师",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"zhangwh@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1131313,
						weixin_id:"loverzhao316",
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"赵慧杰",
						nickName: "赵慧杰",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 总裁助理"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"zhaohj@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"总裁助理",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"zhaohj@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1131614,
						weixin_id:"crazy526761407",
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"唐畅",
						nickName: "唐灿",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 技术中心UI工程师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"tangc@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"UI工程师",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"tangc@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1135614,
						weixin_id:"terabithiaMT",
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"陈梦婷",
						nickName: "大喜丸ഒ",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 技术中心UI工程师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"chenmt@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"UI工程师",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"chenmt@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1137814,
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"陈金鹿",
						nickName: "鹿小鏖",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 技术中心云计算工程师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"chenjl@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"云计算工程师",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"chenjl@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1961314,
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"吴浩清",
						nickName: "左手",
						edu:"学士",
						pos:["珠海大横琴科技发展有限公司 技术中心架构师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"wuhq@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"架构师",
						company_name:"珠海大横琴科技发展有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"wuhq@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1361314,
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"米丰有",
						nickName: "0",
						edu:"学士",
						pos:["深圳毅德零空科技有限公司 开发工程师"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"mify@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"开发工程师",
						company_name:"深圳毅德零空科技有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"mify@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					},
					{
						id:1361521,
						logo:"../../static/img/pers_logo/denglb_logo.png",
						name:"张慧瑶",
						edu:"学士",
						pos:["珠海物通科技有限公司 项目经理"],
						others:[{label:"地址",value:"珠海市香洲区吉大景山路82号"},
							{label:"邮箱",value:"zhanghy@dhqtech.com"},
							{label:"网址",value:"www.dhqtech.com"},
							{label:"邮编",value:"519031"},
							{label:"手机号",value:"18529491814"},
							{label:"固话号",value:"0756-3651214"}
						],
						post:"项目经理",
						company_name:"珠海物通科技有限公司",
						addr:"珠海市香洲区吉大景山路82号",
						e_mail:"zhanghy@dhqtech.com",
						webs:"www.dhqtech.com",
						zip_code:"519031",
						pho_no:"18529491814",
						tel_no:"0756-3651214"
					}
				]
			}
		},
		onLoad() {
			let isCanUse=uni.getStorageSync('isCanUse')
			if(isCanUse=="100"){
				this.getCardList()
			}
		},
		onShow(){
			let isCanUse=uni.getStorageSync('isCanUse')
			if(isCanUse=="100"){
				this.getCardList()
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
					let relt=this.getCardListForSear()
					if(relt){
						this.is_card_list=false
						this.card_list_show=[]
						this.card_list_show=relt
						this.is_card_list=true
					}
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
					// let sw_str=JSON.stringify({type:"sw_t",val:obj})
					// uni.setStorage({
					// 	key:"swTab",
					// 	data:sw_str,
					// 	success:function(){
							
					// 	}
					// })
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
