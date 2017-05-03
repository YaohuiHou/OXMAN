<template>
  <div class="btm-box">

    <div class="btm-nav" @click="jump('/home')">
      <image class="btm-ico" src="https://s.kcimg.cn/app/icon/oxman/home-ico.png"></image>
      <text class="btm-txt">首页</text>
    </div>
    <div class="btm-nav" @click="$emit('cite')">
      <image class="btm-ico" :src="DATA.bu_islike ? zans[1] : zans[0]"></image>
      <text :class="DATA.bu_islike ? ['btm-txt blu'] : ['btm-txt']">{{DATA.bu_like}}</text>
    </div>
    <div class="btm-nav" @click="$emit('hides')">
      <image class="btm-ico" src="https://s.kcimg.cn/app/icon/oxman/call.png"></image>
      <text class="btm-txt">{{SUM}}</text>
    </div>
    <div class="btm-nav" @click="shares">
      <image class="btm-ico" src="https://s.kcimg.cn/app/icon/oxman/shee.png"></image>
      <text class="btm-txt">{{DATA.bu_share}}</text>
    </div>
  </div>
</template>

<script>
let THAW = weex.requireModule('THAW');
  export default {
    props:{
      DATA: Object,
      SUM: {
        type: [Number, String],
        default: 0
      }
    },
    data () {
      return {
        zans: [
          'https://s.kcimg.cn/app/icon/oxman/t-zans.png',
          'https://s.kcimg.cn/app/icon/oxman/t-zanok.png',
        ]
      }
    },
    methods: {
      shares(){
        //   native操作  分享
          THAW.onShowShare({
              title: this.DATA.bu_title, // 分享标题
              desc: "", // 分享描述
              link: this.$getConfig().shareUrl + 'pages?id=' + this.DATA.bu_articleid + "&tp=" , // 分享链接
              imgUrl: this.DATA.bu_authorimgurl == '' ? "https://s.kcimg.cn/app/icon/oxman/shll.png" : this.DATA.bu_authorimgurl// 分享图标
          });
      }
    }
  }
</script>

<style scoped>
.btm-box{height: 98px; background-color: #FAFBFC;flex-direction:row; justify-content:center;align-items:center;}
.btm-ico{width: 34px; height: 34px; margin-right: 20px;}
.btm-nav{flex:1; flex-direction:row;justify-content:center;align-items:center;}
.btm-txt{font-size: 28px;color: #999;}
.blu{color: #2A60FE;}
</style>
