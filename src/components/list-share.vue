<template>
  <div class="ymsg-box">
      <image resize="cover" class="pic" :src="DATA.bu_mainimgjson[0]"></image> 
      <div class="text-box">
        <text class="text">{{DATA.bu_title}}</text>
        <div class="tim-box">
          <text v-if="DATA.bu_categoryname" class="lable">{{DATA.bu_categoryname}}</text>
          <text class="user-name">{{DATA.bu_author}}</text>
          <text class="time">{{ DATA.bu_pushdatetime | timeAgo }}</text>
        </div> 
      </div>
  </div>
</template>
<script>
  export default {
    props: {
      DATA: {
        bu_mainimgjson:[]
      }
    },
    methods: {
    }
  }
</script>
<style scoped>
.ymsg-box{
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom-width: 4px;
  border-bottom-color: #eee;
  border-bottom-style: solid;
  flex-direction:row;
}
.pic{
  width: 220px;
  height: 148px;
}
.text-box{
  padding-left: 10px;
  flex: 1;
}
.text{
  height: 118px;
  overflow: hidden;
  line-height: 48px;
  font-size: 32px;
  color: #333;
}
.tim-box{
  height: 30px;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-end;
}
.lable{font-size: 20px;color: #268BE7;border-width: 2px;border-color: #268BE7;border-style: solid;text-align: center;width: 96px;height: 26px;line-height: 26px;}
.user-name{
  flex:1;font-size: 28px;color: #999;padding-left: 10px; line-height: 30px;
}
.time{color: #999;font-size: 28px;line-height: 30px;}
</style>

