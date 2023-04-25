<template>
  <div class="addaddress">
    <!-- 页头 -->
    <van-nav-bar
      title="收货地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 添加地址 -->
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave($event)"
    />
  </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { Toast } from 'vant';
export default {
  data() {
    return {
      uid:sessionStorage.getItem('uid'),
      //地区列表
      areaList,
    }
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
    //保存 
    onSave(event){
      console.log(event)
      this.axios.post('/address/reg',`uid=${this.uid}&name=${event.name}&tel=${event.tel}&province=${event.province}&city=${event.city}&county=${event.county}&address=${event.addressDetail}&areaCode=${event.areaCode}&postalCode=${event.postalCode}`)
      .then((result)=>{
        console.log(result.data)
        Toast('保存成功')
        this.$router.push(`/address/${this.uid}`)
      })
    }
  },
}
</script>

<style>
.addaddress .van-nav-bar{
  background-color: rgb(222,196,155);
}
.addaddress .van-nav-bar .van-icon,
.addaddress .van-nav-bar__text,
.addaddress .van-nav-bar__title{
  color: white;
}
.addaddress .van-button--danger{
  background-color: rgb(222,196,155);
  border: 1px solid rgb(222,196,155);
}
.addaddress .van-button--default{
  color: rgb(222,196,155);
  border: 1px solid rgb(222,196,155);
}
</style>