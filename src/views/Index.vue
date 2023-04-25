<template>
    <div class="index">
        <!-- 头部 -->
        <div class="header">
            <!-- 位置 -->
            <div class="position">
                <van-cell title="北京" icon="location-o" />
            </div>
            <!-- 搜索框 -->
            <van-search
            shape="round"
            background="rgb(222,196,155)"
            placeholder="请输入搜索关键词"
            class="search"
            />
            <!-- 客服 -->
            <van-icon name="comment-o" size="18" color="white"/>
        </div>
        <!-- 主体 -->
        <div class="container">
          <!-- 轮播图 -->  
          <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <img :src="image" alt="" style="width:100%;height:175px" >
            </van-swipe-item>
          </van-swipe>  
          <!-- 绿图 -->
          <div>
              <img src="img/index/part2.jpg" alt="" style="width:100%">
          </div>
          <!-- 四小方块 -->
          <div class="select">
              <div class="item item1">
                  <h2>今日精选</h2>
                  <p>每日一推荐</p>
                  <img src="img/index/part3-1.png" alt="">
              </div>
              <div class="item item2">
                  <h2>优惠专区</h2>
                  <p>最低享5折</p>
                  <img src="img/index/part3-2.png" alt="">
              </div>
              <div class="item item3">
                  <h2>满减放送</h2>
                  <p>满199减100</p>
                  <img src="img/index/part3-3.png" alt="">
              </div>
              <div class="item item4">
                  <h2>重磅新品</h2>
                  <p>新品大放送</p>
                  <img src="img/index/part3-4.png" alt="">
              </div>
          </div>
          <!-- 商品部分 -->
          <div class="part">
              <!-- 商品第一部分 -->
              <div class="title">
                  <img src="img/index/title-1.png" alt="" style="width:100%">
              </div>
              <div class="part-item part-item1">
                  <router-link :to="{name:'product',params:{lid:item.lid}}" v-for="(item,index) of part1" :key="index">
                      <img :src="item.pic_path" alt="">
                  </router-link>
              </div>
              <!-- 商品第二部分 -->
              <div class="title">
                  <img src="img/index/title-2.png" alt="" style="width:100%">
              </div>
              <div class="part-item part-item2">
                  <router-link :to="{name:'product',params:{lid:item.lid}}" v-for="(item,index) of part2" :key="index">
                      <img :src="item.pic_path" alt="">
                  </router-link>
              </div>
              <!-- 商品第三部分 -->
              <div class="title">
                  <img src="img/index/title-1.png" alt="" style="width:100%">
              </div>
              <div class="part-item part-item1">
                  <router-link :to="{name:'product',params:{lid:item.lid}}" v-for="(item,index) of part1" :key="index">
                      <img :src="item.pic_path" alt="">
                  </router-link>
              </div>
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
            uid:sessionStorage.getItem('uid'),
            images:[
               'img/index/lb4.jpg',
               'img/index/lb6.jpg',
               'img/index/lb11.jpg',
               'img/index/lb12.jpg'
            ],
            active:0,
            part1:[],
            part2:[],
        }
    },
    mounted(){
        this.axios.get('/v1/index')
        .then((result)=>{
            console.log(result.data.data)
            // 第一大块 样式不同
            this.part1=result.data.data.slice(0,6)
            // 第二大块
            this.part2=result.data.data.slice(7)
        })
    },
}
</script>

<style>
.index .header{
    width: 100%;
    height: 50px;
    padding-top: 5px;
    background-color: rgb(222,196,155);
    position: fixed;
    z-index: 99;
}
.index .header .position{
    display: inline-block;
}
.index .header .position .van-cell{
    background-color: rgb(222,196,155);
    padding: 10px 0 10px 12px;
}
.index .header .position .van-icon-location-o:before {
    content: '\E6D9';
    color: white;
}
.index .header .position .van-cell__title span{
    color: white;
}
.index .header .search{
    width: 75%;
    display: inline-block;
}
.index .header .van-search .van-cell{
    line-height: 20px;
    padding: 3px 2px 3px 0;
}
.index .container{
    background-color: rgb(222,196,155);
    padding: 5px 10px;
}
.index .van-swipe{
    margin-top: 50px;
    border-radius: 20px;
    margin-bottom: 10px;
}
.index .van-swipe .van-swipe__indicator--active{
    background-color: rgb(222,196,155);
}
.index .container .select{
    margin-top: 10px;
    height: 130px;
    position: relative;
}
.index .container .select .item{
    width: 27%;
    height: 88%;
    border-radius: 10px;
    background-color: #fff;
    font-size: 10px;
    position: absolute;
    text-align: center;
    padding: 8px 0 6px 3px;
    box-shadow: 1px 2px 10px #ccc;
}
.index .container .select .item img{
    width: 58%;
    margin-top: 8px;
}
.index .container .select .item h2{
    color: red;
    margin: 0;
}
.index .container .select .item p{
    color: rgb(201,175,138);
    margin: 0;
}
.index .container .select .item1{
    left: 0;
    z-index: 4;
}
.index .container .select .item2{
    background-color: rgb(229,220,205);
    left: 85px;
    z-index: 3;
}
.index .container .select .item2 h2{
    color: black;
}
.index .container .select .item3{
    left: 170px;
    z-index: 2;
}
.index .container .select .item4{
    background-color: rgb(229,220,205);
    left: 255px;
    z-index: 1;
}
.index .container .select .item4 h2{
    color: black;
}
.index .container .part{
    padding-bottom: 50px;
}
.index .container .part .part-item{
    margin-bottom: 20px;
}
.index .container .part .part-item1 img{
    width: 50%;
    height: 180px;
}
.index .container .part .part-item2 img{
    width: 100%;
}
.index .van-tabbar--fixed{
    background-color: rgb(222,196,155);
}

</style>