<template>
  <div class="address">
    <!-- 页头 -->
    <van-nav-bar
      title="我的收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 选择地址 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      @add="onAdd"
    />
    <van-button 
    type="primary"
    color="rgb(222,196,155)"
    round
    plain
    @click="confirm"
    >确认</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return {
      uid:sessionStorage.getItem('uid'),
      chosenAddressId:'',
      list: [],
    }
  },
  mounted() {
    this.axios.get(`/address/${this.uid}`)
    .then((result)=>{
      console.log(result.data)
      this.list=result.data.data
    })
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    //新增地址
    onAdd(){
      Toast('新增地址')
      this.$router.push('/addaddress')
    },
    //点击确认 
    confirm(){
      console.log(this.chosenAddressId)
      //判断
      if(this.chosenAddressId==''){
        Toast('请选择收货地址')
      }else{
        this.$router.push({name:'order',params:{key:this.chosenAddressId}})
      }
    }
  },
}
</script>

<style>
.address .van-nav-bar{
  background-color: rgb(222,196,155);
}
.address .van-nav-bar__text,
.address .van-nav-bar__title,
.address .van-nav-bar .van-icon{
  color: white;
}
.address .van-button--danger{
  background-color: rgb(222,196,155);
  border: 1px solid rgb(222,196,155);
}
.address .van-button{
  margin-bottom: 50px;
}
.address .van-button--plain{
  position: absolute;
  width: 91%;
  left:15px;
  bottom: 64px;
}
</style>