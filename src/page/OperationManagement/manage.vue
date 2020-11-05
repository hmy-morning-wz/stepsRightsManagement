<template>
	<div class="manage_page fillcontain">
		<div style="height: 100%;" class="header">
	  		<div style="min-height: 100%; background-color: #324057;flex:1">
				<div style="height:100%">
                    <el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router background-color="#324057" text-color="#fff">
                        <el-menu-item index="manage"><i class="el-icon-menu"></i>首页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title"><i class="el-icon-document"></i>运营管理</template>
                            <el-menu-item class="comm-pdl50" index="cardEditor">支付宝卡编辑</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="basicSet">基础功能管理</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="smallProgram">小程序运营</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-plus"></i>app运营管理</template>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-tickets"></i>活动管理</template>
                            <el-menu-item class="comm-pdl50" index="activityList">活动列表</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title"><i class="el-icon-star-on"></i>营销数据</template>
                            <el-menu-item class="comm-pdl50" index="activityAffect">活动效果</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="operatingData">运营数据</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title"><i class="el-icon-view"></i>数据报表</template>
                            <el-menu-item class="comm-pdl50" index="dataReport">用户基础交易</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="dataReport2nd">扫码业务分析</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="dataReport3rd">每日增活用户</el-menu-item>
                            <el-menu-item class="comm-pdl50" index="userPortrait">基础用户画像</el-menu-item>
                        </el-submenu>
				   </el-menu>
                </div>
			</div>
			<div style="height: 100%;overflow: auto;flex:5">
				<!-- <keep-alive> -->
				    <router-view></router-view>
				<!-- </keep-alive> -->
			</div>
		</div>
  	</div>
</template>

<script>
    export default {
		computed: {
			defaultActive: function(){
				return this.$route.path.replace('/', '');
			}
		},
    }
</script>


<style lang="scss" scoped>
 .header{
     display: flex;
 }
 .test:after {
        content:' ';
        display: block;
        height:0;
        clear:both;
    }
    .comm-pdl50{
        padding-left: 50px !important;
    }
</style>
