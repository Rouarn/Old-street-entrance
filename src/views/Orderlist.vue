<template>
  <div class="orderlist">
    <!-- 导航栏 -->
    <van-nav-bar title="全部订单" left-text="返回" left-arrow>
      <template #right>
        <van-icon name="service-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 订单导航 -->
    <van-tabs 
    v-model="active1"
    color="rgb(222,196,155)"
    >
      <van-tab title="全部订单">
        <!-- 商品小卡片 -->
        <van-card
          v-for="(item,i) of allorder" :key="i"
          :num="item.num"
          :price="(item.price * item.num).toFixed(2)"
          :desc="item.category"
          :title="item.title"
          :thumb="`img/product/${item.pic}`"
        >
          <template #tags>
            <van-tag plain type="danger">包邮</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">退款</van-button>
            <van-button 
            size="mini"
            color="rgb(222,196,155)"
            >催发货</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待付款">
        <van-empty description="您还没有待付款的订单哦~" />
      </van-tab>
      <van-tab title="待发货">
        <!-- 商品小卡片 -->
        <van-card
          v-for="(item,i) of allorder" :key="i"
          :num="item.num"
          :price="(item.price * item.num).toFixed(2)"
          :desc="item.category"
          :title="item.title"
          :thumb="`img/product/${item.pic}`"
        >
          <template #tags>
            <van-tag plain type="danger">包邮</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">退款</van-button>
            <van-button 
            size="mini"
            color="rgb(222,196,155)"
            >催发货</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待收货">
        <van-empty description="您的包裹还有发出哦~" />
      </van-tab>
      <van-tab title="已完成">
        <van-empty description="还没有属于您的订单哦~" />
      </van-tab>
    </van-tabs>
    <!-- 底部 -->
        <van-tabbar v-model="active" active-color="rgb(222,196,155)" inactive-color="#fff" class="footer">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="apps-o" to="">分类</van-tabbar-item>
            <van-tabbar-item icon="cart-o" :to="`/cart/${this.uid}`">购物车</van-tabbar-item>
            <van-tabbar-item icon="orders-o" to="">订单</van-tabbar-item>
            <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid:sessionStorage.getItem('uid'),
      // 底部
      active:3,
      //订单导航
      active1:0,
      allorder:[],
    }
  },
  mounted() {
    this.axios.get(`/order/${this.uid}`)
    .then((result)=>{
      console.log(result)
      this.allorder=result.data.data
    })
  },
  methods: {
    
  },
}
</script>

<style>
.orderlist .van-nav-bar{
  background-color: rgb(222, 196, 155);
}
.orderlist .van-nav-bar .van-icon,
.orderlist .van-nav-bar__text,
.orderlist .van-nav-bar__title{
  color: white;
}
.orderlist .van-tabbar--fixed{
  background-color: rgb(222,196,155);
}
</style>