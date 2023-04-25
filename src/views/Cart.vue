<template>
    <div class="cart">
        <!-- 导航栏 -->
        <van-nav-bar title="购物车" left-text="返回" left-arrow>
        <template #left>
            <van-icon name="service-o" size="18" />
        </template>    
        <template #right>
            <van-tag size="medium" color="rgb(222,196,155)" type="primary">管理</van-tag>
        </template>
        </van-nav-bar>
        <!-- 购物车卡片 -->
        <div class="card">
            <!-- 标题 -->
            <div class="title">
                <img src="../assets/images/logo.png" alt="">&nbsp;&nbsp;
                <span>老街口旗舰店&nbsp;&nbsp;></span>
            </div>
            <!--  -->
            <van-checkbox-group v-model="result" ref="checkboxGroup">
                <div class="container" v-for="(item,i) of cart" :key="i">
                  <div class="left">
                    <van-checkbox 
                    :name="i"
                    checked-color="rgb(222,196,155)"
                    >
                        <img :src="`img/product/${item.pic}`" alt="">
                        <div class="con">
                            <div class="tit">{{item.title}}</div>
                            <div class="spec">规格:{{item.category}}</div>
                            <div class="price">￥{{item.price}}</div>
                        </div>
                    </van-checkbox> 
                  </div>
                  <div class="right">
                        <van-stepper  
                        theme="round" 
                        button-size="16" 
                        disable-input
                        v-model="item.num"
                        @change="changeNum(item.num,item.cid)" 
                        />
                    </div>  
                </div>
                
                
            </van-checkbox-group>
        </div>
        <!-- 结算 -->
        <van-submit-bar :price="sum" button-text="结算" @submit="onSubmit">
            <!-- 全选 反选 -->
            <van-button 
            type="primary"
            round
            size="mini"
            color="rgb(222,196,155)"
            @click="checkAll"
            >全选</van-button>&nbsp;
            <van-button 
            type="info"
            round
            size="mini"
            plain
            color="rgb(222,196,155)"
            @click="toggleAll"
            >反选</van-button>
        </van-submit-bar>
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
import { Toast } from 'vant';
export default {
    data(){
        return{
            uid:sessionStorage.getItem('uid'),
            result:[],
            active:2,
            cart:[],
            mycart:[],
            //修改数量
            num:[],
            //总价
            sum:0,
        }
    },
    mounted(){
        this.axios.get(`/cart/${this.uid}`)
        .then((result)=>{
            console.log(result)
            this.cart=result.data.data
            //修改数量
            for(var i in this.cart){
                this.num[this.cart[i].cid]=this.cart[i].num
                console.log(this.num[this.cart[i].cid])
            }
        })
    },
    methods:{
        //步进器
        changeNum(num,cid){
            console.log(num,cid)
            this.num[cid]=num
        },
        // 全选
        checkAll() {
            this.$refs.checkboxGroup.toggleAll(true);
            console.log(this.result)
            console.log(this.cart)
            //计算总价
            this.sum=0
            for(var i in this.result){
                this.sum+=this.cart[i].num * this.cart[i].price *100
            }
            console.log(this.sum)
        },
        //反选
        toggleAll() {
            this.$refs.checkboxGroup.toggleAll();
            this.sum=0
        },
        // 结算
        onSubmit(){
            //判断
            if(this.sum!==0){
                this.axios.get(`/cart/${this.uid}`)
                .then((result)=>{
                    console.log(result.data)
                    this.mycart=result.data.data
                    //因为页面中不止一条数据 所以要进行循环
                    for(var i=0;i<this.mycart.length;i++){
                        this.axios.post('/pay/reg',`uid=${this.uid}&title=${this.mycart[i].title}&image=${this.mycart[i].pic}&category=${this.mycart[i].category}&price=${this.mycart[i].price}&num=${this.num[this.mycart[i].cid]}`)
                        .then((result)=>{
                            console.log(result.data)
                        })
                    }
                })
                //跳到确认订单页面
                this.$router.push('/order')
            }else{
                Toast({message: '要选择商品才能结算哦~',position: 'bottom',duration: 2000,});
            }
            
        }
    }
}
</script>

<style>
.cart .van-nav-bar{
    background-color: rgb(222,196,155);
    height: 90px;
}
.cart .van-nav-bar .van-icon,
.cart .van-nav-bar__title{
    color: white;
}
.cart .card{
    width: 90%;
    border: 1px solid rgb(222,196,155);
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    top: -45px;
    left: 8px;
    z-index: 5;
    padding: 10px;
    margin-bottom: 10px;
}
.cart .card .title img{
    width: 30px;
    border-radius: 5px;
    vertical-align: middle;
}
.cart .card .title span{
    font-size: 12px;
}
.cart .card .left img{
    width: 70px;
    margin-top: 10px;
    vertical-align: top;
    margin-right: 10px;
}
.cart .card .left .con{
    display: inline-block;
}
.cart .card .left .con div{
    font-size: 12px;
}
.cart .card .left .con .tit{
    margin-top: 5px;
    width: 125px;
    height: 37px;
}
.cart .card .left .con .spec{
    margin-top: 20px;
}
.cart .card .left .con .price{
    color: rgb(222,196,155);
    font-size: 16px;
    font-weight: 600;
}
.cart .card .right{
    float: right;
    margin-top: -30px;
}
.cart .van-submit-bar{
    margin-bottom: 50px;
}
.cart .van-tabbar--fixed{
    background-color: rgb(222,196,155);
}
</style>