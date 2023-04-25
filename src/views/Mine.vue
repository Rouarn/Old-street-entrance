<template>
    <div class="mine">
        <!-- 标题 -->
        <van-cell title=" " >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
            <van-icon name="setting-o" class="search-icon" />
        </template>
        </van-cell>
        <!-- 头像 名字 -->
        <div class="container">
            <van-image
                round
                width="50px"
                height="50px"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
            <div class="text" v-if="$store.state.islogin" @click="out">
                <span>{{this.user[0].phone}}</span><br>
                <span>退出登录</span>
            </div>
            <div class="text" v-else @click="login">
                <span>未登录，点击登录</span>
            </div>
            <!--  -->
            <div class="tools">
                <van-grid :border='false'>
                    <van-grid-item text="0" />
                    <van-grid-item text="0" />
                    <van-grid-item text="0" />
                    <van-grid-item text="0" />
                </van-grid>
                <van-grid :border='false'>
                    <van-grid-item text="收藏夹" />
                    <van-grid-item text="关注" />
                    <van-grid-item text="足迹" />
                    <van-grid-item text="说说" />
                </van-grid> 
            </div>
        </div>
        <!-- 底部 -->
        <van-tabbar v-model="active" active-color="rgb(222,196,155)" inactive-color="#fff" class="footer">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="/classify">分类</van-tabbar-item>
            <van-tabbar-item icon="cart-o" :to="`/cart/${this.uid}`">购物车</van-tabbar-item>
            <van-tabbar-item icon="orders-o" :to="`/orderlist/${this.uid}`">订单</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    data(){
        return{
            active:4,
            uid:sessionStorage.getItem('uid'),
            user:[{phone:''}],
        }
    },
    mounted(){
        this.axios.get(`/v1/users/count/${this.uid}`)
        .then((result)=>{
            console.log(result.data)
            this.user=result.data.data
        })
    },
    methods:{
        login(){
            this.$router.push('/login')
        },
        out(){
            this.$router.push('/')
            // 修改vuex中的登录状态
            this.$store.commit('logout')
            sessionStorage.removeItem('islogin')
            sessionStorage.removeItem('phone')
            sessionStorage.removeItem('uid')
        }
    }
}
</script>

<style>
.mine .van-cell{
    background-color: rgb(222,196,155);
}
.mine .van-icon-setting-o:before {
    content: '\E745';
    color: white;
}
.mine .van-icon{
    font-size: 20px;
}
.mine .van-cell::after{
    border: 0;
}
.mine .container{
    background-color: rgb(222,196,155);
    height: 160px;
    position: relative;
}
.mine .van-image--round {
    margin-top: 30px;
    margin-left: 50px;
}
.mine .container .text{
    position: absolute;
    left: 120px;
    top: 40px;
    color: white;
}
.mine .container .van-grid-item__content{
    background: none;
    padding: 4px 0;
}
.mine .container .van-grid-item__text:nth-child(1){
    color: white;
    font-size: 14px;
}
.mine .container .tools{
    width: 80%;
    margin-left: 40px;
}
.mine .van-tabbar--fixed{
    background-color: rgb(222,196,155);
}
</style>