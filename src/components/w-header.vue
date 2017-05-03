<template>
  <div class="header">
    <div class="backs" @click="back()">
      <image class="backImg" src="https://s.kcimg.cn/app/icon/oxman/backs.png"></image>
    </div>

    <div class="nav">
      <text class="nav">{{titles}}</text>
    </div>

    <div class="sub-btn">
      <text class="blu"></text>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      titles: {
        type: String,
        default: '……'
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .backImg{width: 38px; height: 38px;}
  .header {
    height: 88px;
    background-color: #FAFBFC;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .blu{ font-size: 36px; color: #1571e5; line-height: 88px;}
  .backs {
    height: 72px;
    padding-left: 30px;
    align-items:center;
    justify-content:center;
  }
  .sub-btn{
    height: 72px;
    padding-right: 30px;
    align-items:center;
    justify-content:center;
  }
  .nav {
    height: 88px;
    line-height: 88px;
    font-size: 36px; color: #333;
  }
</style>
