<template>
  <div class="classify">
    <!-- 搜索框 -->
    <van-search 
    placeholder="请输入搜索关键词"
    shape="round" 
    />
    <!-- 商品 -->
    <van-row>
      <!-- 侧边栏 -->
      <van-col span="8">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item 
          v-for="(item,i) of leibie" :key="i"
          :title="item.fname" />
        </van-sidebar>
      </van-col>
      <van-col span="16">
        <van-card
        v-for="(item,i) of product" :key="i"
          :price="item.price"
          :title="item.title"
          :thumb="`img/product/${item.pic}`"
        >
          <template #tags>
            <van-tag 
            plain 
            type="danger"
            color="rgb(222,196,155)">老街口</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">查看详情</van-button>
            <van-button size="mini">加入购物车</van-button>
          </template>
        </van-card>
      </van-col>
    </van-row>
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
  data() {
    return {
      uid:sessionStorage.getItem('uid'),
      activeKey:0,
      active:1,
      leibie:[],
      product:[],
    }
  },
  mounted() {
    this.axios.get('/v1/products/fid')
    .then((result)=>{
      console.log(result)
      this.leibie=result.data.data
    })
    this.axios.get('/v1/products/1')
      .then((result)=>{
        console.log(result.data)
        this.product=result.data.data
    })
  },
  watch:{
    //监听函数
    activeKey(){
      this.axios.get(`/v1/products/${this.activeKey+1}`)
      .then((result)=>{
        console.log(result.data)
        this.product=result.data.data
      })
    }
  },
}
</script>

<style>
.classify .van-col--8{
  width: 25%;
}
.classify .van-col--16{
  width: 75%;
}
.classify .van-button--default{
  color: rgb(222,196,155);
  border-radius: 5px;
}
.classify .van-button--mini+.van-button--mini{
  background-color: rgb(222,196,155);
  color: white;
}
.classify .van-sidebar-item--select::before{
  background-color: rgb(222,196,155);
}
.classify .van-sidebar-item--select{
  color: rgb(222,196,155);
}
.classify .van-tabbar--fixed{
    background-color: rgb(222,196,155);
}
</style>