<template>
  <div class="order">
    <!-- 顶部 -->
    <van-nav-bar 
    title="确认订单" 
    left-text="返回" 
    left-arrow
    @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="service-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 选择地址 -->
    <router-link :to="`/address/${this.uid}`">
      <van-contact-card
        type="edit"
        :name="currentContact.name==[] ? '请选择' : currentContact.name"
        :tel="currentContact.tel==[] ? ' 请选择' : currentContact.tel"
        @click="onEdit"
      />
    </router-link>
    
    <!-- 购物车卡片 -->
    <div class="card">
      <div class="title">
        <img src="../assets/images/logo.png" alt="">&nbsp;&nbsp;
        <span>老街口旗舰店&nbsp;&nbsp;></span>
      </div>
      <div class="container" v-for="(item,i) of order" :key="i">
        <div class="left">
          <img :src="`img/product/${item.image}`" alt="">
          <div class="con">
            <div class="tit">{{item.title}}</div>
            <div class="spec">规格:{{item.category}}</div>
            <div class="price">￥{{(item.price * item.num).toFixed(2)}}</div>
          </div>
        </div>
        <div class="right">
          <span class="num">×{{item.num}}</span>
        </div>
      </div>
    </div>
    <!-- 支付方式 -->
    <van-radio-group v-model="radio">
      <van-cell-group>
        <van-cell 
        title="老街口钱包" 
        clickable 
        @click="radio = '1'"
        icon="credit-pay"
        >
          <template #right-icon>
            <van-radio name="1" />
          </template>
        </van-cell>
        <van-cell 
        title="微信支付" 
        clickable 
        @click="radio = '2'"
        icon="wechat-pay"
        >
          <template #right-icon>
            <van-radio name="2" />
          </template>
        </van-cell>
        <van-cell 
        title="支付宝" 
        clickable 
        @click="radio = '3'"
        icon="alipay"
        >
          <template #right-icon>
            <van-radio name="3" />
          </template>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <!-- 提交订单 -->
    <van-submit-bar 
    :price="total" 
    button-text="提交订单" @submit="onSubmit" 
    />
    <van-action-sheet 
    v-model="show" 
    title="确认支付密码"
    >
    <div class="tanchu">
      <!-- 密码输入框 -->
      <van-password-input
        :value="Mvalue"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <!-- 数字键盘 -->
      <van-number-keyboard
        v-model="Mvalue"
        :show="showKeyboard"
        @blur="showKeyboard = false"
      />
      <van-button 
      plain 
      type="default"
      round
      @click="confirm(Mvalue)"
      >
      确认密码</van-button>
    </div>
    </van-action-sheet>
    
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data(){
    return{
      uid:sessionStorage.getItem('uid'),
      currentContact: {
        name: '',
        tel: '',
      },
      radio:'1',
      Mvalue:'',
      //支付密码
      showKeyboard:true,
      //弹出支付窗口
      show:false,
      order:[],
      //获取地址页面的id
      id:this.$route.params.key,
    }
  },
  mounted() {
    setTimeout(()=>{
      this.axios.get(`/pay/${this.uid}`)
      .then((result)=>{
        console.log(result.data)
        this.order=result.data.data
      })
    },200)

    this.axios.get('/address',{params:{id:this.id}})
    .then((result)=>{
      console.log(result.data)
      this.currentContact=result.data.data[0]
    })
    .catch((result)=>{
      console.log(result)
    })
  },
  methods:{
    onClickLeft(){
      this.$router.push(`/cart/${this.uid}`)
      //删除支付表
      this.axios.delete(`/pay/delete/${this.uid}`)
      .then((result)=>{
        console.log(result.data)
      })
    },
    onEdit() {
      Toast('编辑');
    },
    // 提交订单
    onSubmit(){
      this.show=true
    },
    //支付
    confirm(Mvalue){
      if(Mvalue.length!==6 || Mvalue!=='123456'){
        Toast("密码输入错误请重新输入")
      }else{
        for(var i=0;i<this.order.length;i++){
          this.axios.post('/order/reg',
          `lid=${this.order[i].id}&uid=${this.uid}&title=${this.order[i].title}&pic=${this.order[i].image}&num=${this.order[i].num}&category=${this.order[i].category}&price=${this.order[i].price}`)
          .then((result)=>{
            console.log(result.data)
          })
        }
        this.$router.push('/paysuccess')
        //删除支付表
        this.axios.delete(`/pay/delete/${this.uid}`)
        .then((result)=>{
          console.log(result.data)
        })
        //删除购物车表
        this.axios.delete(`/cart/delete/${this.uid}`)
        .then((result)=>{
          console.log(result.data)
        })
      }
    }
  },
  computed:{
    //计算总价
    total(){
      if(this.order){
        var total=0
        for(var i of this.order){
          total+=i.price * i.num *100
        }
        return total;
      }
    }
      
  },
}
</script>

<style>
.order .van-nav-bar {
  background-color: rgb(222,196,155);
} 
.order .van-nav-bar .van-icon,
.order .van-nav-bar__text,
.order .van-nav-bar__title{
  color: white;
}
.order .card{
  padding: 10px;
}
.order .card .title img{
  width: 30px;
  border-radius: 5px;
  vertical-align: middle;
}
.order .card .title span{
  font-size: 12px;
}
.order .card .container .left img{
  width: 70px;
  margin-top: 10px;
  margin-right: 10px;
  vertical-align: top;
}
.order .card .container .left .con{
  display: inline-block;
}
.order .card .container .left .con div{
  font-size: 12px;
}
.order .card .container .left .con .tit{
  margin-top: 10px;
  width: 127px;
  height: 35px;
}
.order .card .container .left .con .spec{
  margin-top: 20px;
}
.order .card .container .left .con .price{
  font-size: 16px;
  color: red;
  font-weight: 600;
}
.order .card .container .right{
  float: right;
  margin-top: -20px;
}
.order .van-radio__icon--checked .van-icon{
  background-color: red;
  border-color: red;
}
.order .tanchu{
  padding: 16px 16px 260px 16px;
}
.order .van-button--round{
  margin-left: 125px;
}
</style>