<template>
  <div class="tabbar-box">

    <div class="item" @click="cgTab(2)">
      <image :src="tab2" class="tab-ico"></image>
      <text class="tab-txt">文章</text>
    </div>

    <div class="item" @click="cgTab(1)">
      <image :src="tab1" class="tab-ico"></image>
      <text class="tab-txt">圈子</text>
    </div>

    <div class="item" @click="jump({path:'/proc',query:{id: $getConfig().userId,u:'1'}})">
      <image :src="tab3" class="tab-ico"></image>
      <text class="tab-txt">个人主页</text>
    </div>

  </div>
</template>

<script>
  export default {
    computed: {
      // 焦点菜单
      actTab () {return this.$store.state.tabbar},
    },
    created () {
      
    },
    data () {
      return {
        tab1:'https://s.kcimg.cn/app/icon/oxman/qzx-ico.png',
        tab2:'https://s.kcimg.cn/app/icon/oxman/wz-ico.png',
        tab3:'https://s.kcimg.cn/app/icon/oxman/sz-ico.png',
        pics: [
          [
            'https://s.kcimg.cn/app/icon/oxman/qz-ico.png',
            'https://s.kcimg.cn/app/icon/oxman/qzx-ico.png'
          ],
          [
            'https://s.kcimg.cn/app/icon/oxman/wz-ico.png',
            'https://s.kcimg.cn/app/icon/oxman/wzx-ico.png'
          ]
        ]
      }
    },
    watch:{
      actTab: 'changUrl'
    },
    methods: {
      cgTab (nb) {
        this.$store.dispatch('MY_NAV', nb)
      },
      changUrl(val,oldval){
        if (val == '1') {
          this.tab2 = this.pics[1][0]
          this.tab1 = this.pics[0][1]
        } else {
          this.tab2 = this.pics[1][1]
          this.tab1 = this.pics[0][0]
        }
      }
    }
  }
</script>

<style scoped>
.tabbar-box{position:fixed;left:0;bottom:0;right:0;height: 98px;flex-direction:row; justify-content:space-around; align-items:center; background-color: #FAFBFC; border-top-style: solid;border-top-width: 2px;border-top-color: #ccc;}
.item{flex:1; justify-content:center; align-items:center;}
.tab-ico{ width: 40px; height: 40px;}
.tab-txt{font-size: 26px; color: #999;}
</style>
