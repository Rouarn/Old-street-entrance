import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 保存共用的变量
  state: {
    //保存当前登录状态
    islogin:sessionStorage.getItem('islogin'),
    //保存当前登录手机号
    phone:sessionStorage.getItem('phone'),
    //保存当前登录用户id
    uid:sessionStorage.getItem('uid')
  },
  // 专门修改state的变量
  mutations: {
    loginok(state,obj){//传参就可以
      state.islogin=true,
      state.phone=obj.phone,
      state.uid=obj.uid
    },
    logout(state){
      state.islogin=false
    }
  },
  actions: {

  }
})
