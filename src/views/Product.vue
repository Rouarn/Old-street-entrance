<template>
    <div class="product">
        <!-- 导航栏 返回 -->
        <van-nav-bar left-arrow fixed @click-left="onClickLeft">
            <!-- 分享面板 -->
            <template #right>
                <van-cell @click="showShare = true" />
                <van-share-sheet
                    v-model="showShare"
                    title="立即分享给好友"
                    :options="options"
                    @select="onSelect"
                />
                <!-- 分享图标 -->
                <van-icon name="share-o" size="20" />
                <!-- 客服图标 -->
                <van-icon name="service-o" size="20" />
            </template>
        </van-nav-bar>
        <!-- 轮播图 -->
        <van-swipe class="lbt">
            <van-swipe-item>
                <img :src="`${lbt.pic1===undefined ? '': `img/product/${lbt.pic1}`}`" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img :src="`${lbt.pic2===undefined ? '': `img/product/${lbt.pic2}`}`" alt="">
            </van-swipe-item>
            <van-swipe-item>
                <img :src="`${lbt.pic3===undefined ? '': `img/product/${lbt.pic3}`}`" alt="">
            </van-swipe-item>
        </van-swipe>
        <!-- 价格标题 -->
        <div class="card">
            <div class="price">
                <p>￥{{detail.price}}<del>89.9</del> <span>起</span> </p>
            </div>
            <div class="title">
                <p>{{detail.title}}</p>
            </div>
        </div>
        <!-- 优惠券单元格 -->
        <van-coupon-cell
        :coupons="coupons"
        :chosen-coupon="chosenCoupon"
        @click="showList = true"
        />
            <!-- 优惠券列表 -->
        <van-popup
                v-model="showList"
                round
                position="bottom"
                style="height: 90%; padding-top: 4px;"
            >
            <van-coupon-list
                :coupons="coupons"
                :chosen-coupon="chosenCoupon"
                :disabled-coupons="disabledCoupons"
                @change="onChange"
                @exchange="onExchange"
            />
        </van-popup>
        <!-- 评价 -->
        <div class="card2">
            <div class="title">
                <p>宝贝评价(555) <span class="sp">查看全部></span> </p>
            </div>
            <div class="tags">
                <van-tag round type="primary">味道</van-tag>
                <van-tag round type="primary">性价比</van-tag>
            </div>
        </div>
        <!-- 分割线 -->
        <van-divider
            :style="{ color: '#aaa', borderColor: '#aaa', padding: '0 16px' }"
            >
            详细信息
        </van-divider>
        <!-- 商品详情图片 -->
        <div class="detail">
            <img :src="`${lbt.pic4===undefined ? '': `img/product/${lbt.pic4}`}`" alt="">
            <img :src="`${lbt.pic5===undefined ? '': `img/product/${lbt.pic5}`}`" alt="">
            <img :src="`${lbt.pic6===undefined ? '': `img/product/${lbt.pic6}`}`" alt="">
        </div>
        <!-- 底部 -->
        <van-goods-action>
            <van-goods-action-icon icon="cart-o" text="购物车" />
            <van-goods-action-icon icon="star-o" text="已收藏" />
            <van-goods-action-button 
            color="rgb(246,227,199)" 
            type="warning" 
            text="加入购物车"
            @click="show1"
            />
            <van-goods-action-button 
            color="rgb(222,196,155)" 
            type="danger" 
            text="立即购买" 
            @click="show1"
            />
            <!-- 商品规格 -->
            <van-sku
            v-model="show"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
            @stepper-change="number"
            />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant';
const coupon = {
  available: 1,
  condition: '无使用门槛\n最多优惠12元',
  reason: '',
  value: 150,
  name: '优惠券名称',
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: '1.5',
  unitDesc: '元',
};
export default {
    data(){
        return{
            uid:sessionStorage.getItem('uid'),
            lid:sessionStorage.getItem('lid'),
            //轮播图
            lbt:[],
            //商品详情卡片
            detail:[],
            showShare: false,
            options: [
                { name: '微信', icon: 'wechat' },
                { name: '微博', icon: 'weibo' },
                { name: '复制链接', icon: 'link' },
                { name: '分享海报', icon: 'poster' },
                { name: '二维码', icon: 'qrcode' },
            ],
            // 优惠券
            showList:false,
            chosenCoupon: -1,
            coupons: [coupon],
            disabledCoupons: [coupon],
            // 商品规格
            show:false,
            sku: {
                tree: [
                    {
                    k: '规格', // skuKeyName：规格类目名称
                    k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                    v: [
                        {
                        id: '1', // skuValueId：规格值 id
                        name: '', // skuValueName：规格值名称
                        },
                    ],
                    }
                ],
                list: [
                    {
                    id: 2259, // skuId
                    s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
                    price: '', // 价格（单位分）
                    stock_num: 50 // 当前 sku 组合对应的库存
                    }
                ],
            },
            goods: {picture:''},
            //当前商品数量
            num:1,
            //
            oldnum:1,
            //购物车 立即购买
            mycart:[],
            //加入购物车 如果商品已存在
            newcart:[],
        }
    },
    mounted(){
        //获取轮播图
        this.axios.get(`/v1/products/pic/${this.$route.params.lid}`)
        .then((result)=>{
            console.log(result)
            this.lbt=result.data.data[0]
        })
        //获取商品信息
        this.axios.get(`/v1/products/pro/${this.$route.params.lid}`)
        .then((result)=>{
            console.log(result)
            this.detail=result.data.data[0]
        })
    },
    methods:{
        onClickLeft(){
            // 回退到上一个页面
            this.$router.go(-1)
        },
        // 分享
        onSelect(option) {
            Toast(option.name);
            this.showShare = false;
        },
        // 优惠劵
        onChange(index) {
            this.showList = false;
            this.chosenCoupon = index;
        },
        onExchange(code) {
            this.coupons.push(coupon);
        },
        //商品规格小卡片
        show1(){
            this.show=true
            this.axios.get(`/v1/products/pro/${window.location.href.slice(window.location.href.lastIndexOf('/')+1)}`)
            .then((result)=>{
                console.log(result.data)
                sessionStorage.setItem('lid',result.data.data[0].lid)
                // 商品图片
                this.goods.picture=`img/product/${result.data.data[0].pic}`
                // 商品价格
                this.sku.list[0].price=result.data.data[0].price*100
                //商品规格
                this.sku.tree[0].v[0].name=result.data.data[0].category
            })
        },
        //数量变化 
        number(value){
            console.log(value)
            this.num=value
        },
        //加入购物车
        onAddCartClicked(){
            Toast('添加成功')
            //将商品规格小卡片隐藏
            this.show=false
            this.axios.get(`/v1/products/pro/${this.lid}`)
            .then((result)=>{
                console.log(result.data)
                this.mycart=result.data.data
                //放的就是添加数量的
                this.newcart=this.mycart
                //查询购物车表中是否存在该商品，如果存在数量加1
                this.axios.get(`/cart/signal/${this.lid}`)
                .then((result)=>{
                    console.log(result.data)
                    //判断
                    if(result.data.code==200){//数量加
                        this.oldnum=result.data.data[0].num
                        this.axios.put('/cart/updata',`product_id=${this.lid}&num=${this.num+this.oldnum}`)
                        .then((result)=>{
                            console.log(result.data)
                        })
                    }else{//直接添加 
                        this.axios.post('/cart/reg',`uid=${this.uid}&product_id=${this.lid}&title=${this.newcart==[] ? '' :this.newcart[0].title}&pic=${this.newcart==[]?'':this.newcart[0].pic}&category=${this.newcart==[] ? '' :this.newcart[0].category}&price=${this.newcart==[] ? '' :this.newcart[0].price}&num=${this.num}`)
                        .then((result)=>{
                            console.log(result)
                        })
                    }
                })
            })
        },
        // 立即购买
        onBuyClicked(){
            this.axios.get(`/v1/products/pro/${this.lid}`)
            .then((result)=>{
                console.log(result.data)
                this.mycart=result.data.data
                this.axios.post('/pay/reg',`uid=${this.uid}&title=${this.mycart==[] ? '' :this.mycart[0].title}&image=${this.mycart==[]?'':this.mycart[0].pic}&category=${this.mycart==[] ? '' :this.mycart[0].category}&price=${this.mycart==[] ? '' :this.mycart[0].price}&num=${this.num}`)
                .then((result)=>{
                    console.log(result.data)
                })
            })
        }
    }
}
</script>

<style>
.product{
    background-color: rgba(221,221,221,0.3);
}
.product .van-nav-bar{
    background-color: transparent;
}
.product .van-cell{
    background-color: transparent;
}
.product .van-nav-bar .van-icon{
    color: white;
    margin-right: 10px;
    font-weight: 900;
}
.product .van-hairline--bottom::after{
    border: 0;
}
.product .lbt img,
.product .detail img{
    width: 100%;
}
.product .van-swipe__indicator--active{
    background-color: rgb(222,196,155);
}
.product .card,
.product .card2{
    width: 90%;
    background-color: #fff;
    margin: 10px auto;
    padding: 10px;
    border-radius: 10px;
}
.product .card .price p{
    margin-top: 8px;
    margin-bottom: 10px;
}
.product .card .price{
    color: rgb(222,196,155);
    font-size: 24px;
    font-weight: 600;
}
.product .card .price del,
.product .card .price span{
    color: #aaa;
    font-size: 14px;
    font-weight: normal;
}
.product .card .title{
    font-size: 18px;
    font-weight: 600;
}
.product .van-cell--clickable{
    background-color: rgb(222,196,155);
    color: white;
    font-weight: 700;
}
.product .van-cell__value,
.product .van-cell__right-icon{
    color: white;
}
.product .card2 p{
    font-weight: 800;
}
.product .card2 .sp{
    font-size: 14px;
    font-weight: normal;
    margin-left: 150px;
}
.product .card2 .van-tag--primary{
    background-color: rgb(222,196,155);
    margin-right: 10px;
}
.product .van-sku-actions .van-button--warning{
    background: linear-gradient(to right,rgb(246,227,199),rgba(246,227,199,0.9));
}
.product .van-sku-actions .van-button--danger{
    background: linear-gradient(to right,rgb(222,196,155),rgba(222,196,155,0.9));
}
</style>