<template>
    <div class="reg">
        <!-- 标题栏 -->
        <van-nav-bar
        title="注册"
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
                :rules="rules.phoneyz"
            />
            <van-field
                v-model="email"
                name="邮箱"
                placeholder="请填写邮箱"
                left-icon="icon iconfont icon-yanzhengma"
                :rules="rules.emailyz"
            />
            <van-field
                v-model="pwd"
                name="密码"
                type="password"
                placeholder="请设置登录密码"
                left-icon="icon iconfont icon-mima"
                :rules="rules.pwdyz"
            />
            <van-checkbox v-model="checked"
            icon-size="14px"
            checked-color="rgb(222,196,155)"
            >我已阅读并同意《用户注册协议》</van-checkbox>
            <div style="margin: 16px;">
                <van-button round block type="info"
                :disabled='!checked' 
                native-type="submit"
                @click="onSubmit"
                >立即注册</van-button>
            </div>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit"
                @click="onChange"
                >已有账号，立即登录</van-button>
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
            email:'',
            pwd:'',
            checked:false,
            //验证手机号 密码 邮箱
            isPhone:false,
            isEmail:false,
            isPwd:false,
            //验证规则
            rules:{
                phoneyz:[
                    {
                      validator:(phone)=>{
                        let result=/^1[3-9]\d{9}$/.test(phone)
                        if(result){
                            this.isPhone=true
                        }else{
                            this.isPhone=false
                        }
                       }  
                    }
                    
                ],
                emailyz:[
                    {
                    validator:(email)=>{
                        let result=/[\w\-]+@[a-z0-9A-Z]+(\.[A-Za-z]{2,4}){1,2}/.test(email)
                        if(result){
                            this.isEmail=true
                        }else{
                            this.isEmail=false
                        }
                       }  
                    }
                ],
                pwdyz:[
                    {
                    validator:(pwd)=>{
                        let result=/^(\w){6,10}$/.test(pwd)
                        if(result){
                            this.isPwd=true
                        }else{
                            this.isPwd=false
                        }
                       }  
                    }
                ],
                
            }
        }
    },
    methods:{
        onClickLeft(){
            // 跳转到首页
            this.$router.push('/');
        },
        onSubmit(){
            //判断
            if(this.isPhone && this.isPwd && this.isEmail){
                this.axios.post('/v1/users/register',`phone=${this.phone}&email=${this.email}&upwd=${this.pwd}`)
                .then((result)=>{
                    console.log(result.data)
                    if(result.data.code==200){
                        Toast({
                        message: '注册成功',
                        position: 'bottom',
                        duration: 1000,
                        });
                        setTimeout(()=>{
                            this.$router.push('/login')
                        },1200)
                    }else{
                        Toast({
                        message: '注册失败',
                        position: 'bottom',
                        duration: 1000,
                        });
                    }
                })
            }else{
                Toast({
                    message: '手机号或者密码或者邮箱格式错误',
                    position: 'bottom',
                    duration: 1000,
                    });
            }
        },
        onChange(){
            this.$router.push('/login')
        }
    },
}
</script>

<style>
.reg .van-nav-bar{
    background-color: rgb(222,196,155);
    height: 50px;
}
.reg .van-nav-bar .van-icon{
    color: white;
    font-size: 24px;
}
.reg .van-nav-bar__title{
    color: white;
    font-size: 20px;
}
.reg .van-cell{
    font-size: 13px;
    width: 90%;
    margin-left: 20px;
    margin-top: 20px;
}
.reg .van-field__control{
    margin-left: 10px;
}
.reg .van-checkbox{
    font-size: 12px;
    margin-top: 20px;
    margin-left: 80px;
}
.reg .van-button--block{
    background-color: rgb(222,196,155);
    border: 1px solid rgb(222,196,155);
}
.reg .van-form > div:nth-child(6) button{
    background-color: #fff;
    color: rgb(222,196,155);
}
</style>