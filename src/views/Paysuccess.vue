<template>
  <div class="paysuccess">
    <van-nav-bar
      title="交易成功"
    />
    <img src="img/支付成功.svg" alt="">
    <h2>支付成功</h2>
    <br>
    <p>商家正在打包，请耐心等待</p>
    <div class="btn">
      <van-button 
      round 
      type="info"
      plain
      color="rgb(222,196,155)"
      @click="order"
      >查看订单</van-button>
      <van-button 
      round 
      type="info"
      color="rgb(222,196,155)"
      to="/"
      >返回首页</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uid:sessionStorage.getItem('uid'),
    }
  },
  methods: {
    order(){
      this.$router.push(`/orderlist/${this.uid}`)
    },
  },
}
</script>

<style>
.paysuccess .van-nav-bar{
  background-color: rgb(222,196,155);
}
.paysuccess .van-nav-bar__title{
  color: white;
}
.paysuccess img{
  width: 260px;
  padding-left: 60px;
  padding-top: 30px;
}
.paysuccess h2,
.paysuccess p{
  text-align: center;
}
.paysuccess .btn{
  text-align: center;
}
.paysuccess .van-button{
  margin: 32px 16px 0 16px;
}
</style>