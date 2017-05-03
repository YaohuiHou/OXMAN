<template>
  <div class="header">
    <div class="logo" @click="back">
      <image class="image" src="https://s.kcimg.cn/app/icon/oxman/back.png"></image>
    </div>

    <div class="nav">
      <div class="link" @click="jump('/')">
        <text :class="show == 1 ? ['active'] : ['title']">首页</text>
      </div>
      <div class="link" @click="jump('/star')">
        <text :class="show == 2 ? ['active'] : ['title']">关注</text>
      </div>
      <div v-if="!attestation" class="link" @click="jump('/myrom')">
        <text :class="show == 3 ? ['active'] : ['title']">我的</text>
      </div>
    </div>

    <div class="add-btn" @click="shares">
      <image class="image" src="https://s.kcimg.cn/app/icon/oxman/shll.png"></image>
    </div>
  </div>
</template>
<script>
const THAW = weex.requireModule('THAW')
const modal = weex.requireModule('modal')
import XHR from '../api'
  export default {
    props: {
      show: {
        type: String,
        default: '1'
      }
    },
    data(){
      return{
         //如果未登录 隐藏我的信息
        attestation:true
      }
    },
    created(){
      // this.getManInfo()
      //如果用户未登录
      // if(this.$getConfig().userId == 0){
      //   this.userInfoShow = false
      // }else{
      //   this.userInfoShow = true
      // }
      // 判断是否注册
      this.getManInfo()

    },
    methods: {
      getManInfo () {
        let self = this
        XHR.getManInfo({'nbuid': this.$getConfig().userId }).then( (res) => {
          if( res.data.status == '1'){
            self.attestation = false
          }else{
            self.attestation = true
          }
        })
      },
      alert (text) {
        modal.toast({
          message: text,
          duration: 0.8
        })
      },
      shares(){
        //   native操作  分享
          THAW.onShowShare({
              title: "卡车之家牛人平台", // 分享标题
              desc: "", // 分享描述
              link: '', // 分享链接
              imgUrl: "https://s.kcimg.cn/app/icon/oxman/shll.png" // 分享图标
          });
      }
    }
  }
</script>
<style scoped>
  .header {
    position: relative;
    height: 88px;
    background-color: #2B61FF;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    width: 72px;
    height: 72px;
    padding-left: 30px;
    justify-content: center;
    align-items: center;
  }
  .add-btn{
    width: 72px;
    height: 72px;
    padding-right: 30px;
    align-items:center;
    justify-content:center;
  }
  .image {
    width: 38px;
    height: 38px;
  }
  .nav {
    height: 88px;
    width: 368px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
  .link {
    margin-left: 30px;
    margin-right: 30px;
    height: 88px;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-size: 36px;
    color: #fff;
    padding-bottom: 10px;
  }
  .active{
    font-size: 36px;
    color: #fff;
    padding-bottom: 10px;
    border-bottom-width: 3px;
    border-bottom-style: solid;
    border-bottom-color: #fff;
  }

</style>
