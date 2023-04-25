<template>
    <div class="login">
        <!-- 标题栏 -->
        <van-nav-bar
        title="登录"
        left-arrow
        @click-left="onClickLeft"
        />
        <!-- 表单 -->
        <van-form>
            <van-field
                v-model="phone"
                name="手机号"
                placeholder="请填写手机号"
                left-icon="icon iconfont icon-shouji1"
                :rules="[{ pattern:/^1[3-9]\d{9}$/ }]"
            />
            <van-field
                v-model="pwd"
                name="密码"
                type="password"
                placeholder="请设置登录密码"
                left-icon="icon iconfont icon-mima"
                :rules="[{ validator }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info"
                native-type="submit"
                @click="onSubmit"
                >立即登录</van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit"
                @click="onChange"
                >没有账号，立即注册</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { Toast } from 'vant';
export default {
    data(){
        return{
            phone:'',
            pwd:'',
            checked:false,
        }
    },
    methods:{
        onClickLeft(){
            // 跳转到首页
            this.$router.push('/');
        },
        // 验证密码
        validator(pwd){
            return /^(\w){6,10}$/.test(pwd) 
        },
        onSubmit(){
            this.axios.post('/v1/users/login',`phone=${this.phone}&upwd=${this.pwd}`)
            .then((result)=>{
                console.log(result.data)
                if(result.data.code==200){
                    Toast({
                        message: '登录成功',
                        position: 'bottom',
                        duration: 1000,
                        });
                        // 跳转到首页
                        setTimeout(()=>{
                            this.$router.push('/')
                        },1100)

                        //修改vuex中的登录状态
                        this.$store.commit('loginok',{phone:this.phone,uid:result.data.data[0].uid})
                        //将islogin phone uid存入sessionStorage
                        sessionStorage.setItem('islogin',true)
                        sessionStorage.setItem('phone',this.phone)
                        sessionStorage.setItem('uid',result.data.data[0].uid)
                }else{
                    Toast({
                        message: '登录失败',
                        position: 'bottom',
                        duration: 1000,
                        });
                }
            })
        },
        onChange(){
            this.$router.push('/register')
        }
    },
}
</script>

<style>
.login .van-nav-bar{
    background-color: rgb(222,196,155);
    height: 50px;
}
.login .van-nav-bar .van-icon{
    color: white;
    font-size: 24px;
}
.login .van-nav-bar__title{
    color: white;
    font-size: 20px;
}
.login .van-cell{
    font-size: 13px;
    width: 90%;
    margin-left: 20px;
    margin-top: 20px;
}
.login .van-field__control{
    margin-left: 10px;
}
.login .van-checkbox{
    font-size: 12px;
    margin-top: 20px;
    margin-left: 80px;
}
.login .van-button--block{
    background-color: rgb(222,196,155);
    border: 1px solid rgb(222,196,155);
}
.login .van-form > div:nth-child(3) button{
    background-color: #fff;
    color: rgb(222,196,155);
}
</style>