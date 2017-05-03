<template>
  <div class="ymsg-box">
      <text class="text">{{DATA.bu_title}}</text>
      
      <div 
      v-if="DATA.bu_mainimgjson.length > 1 ? true : false" 
      class="pic-wrap">
        <image v-for="item in DATA.bu_mainimgjson" :src="item" resize="cover" class="pic-wrap-pic" ></image>
      </div>

      <div class="tim-box">
        <text v-if="DATA.bu_categoryname" class="lable">{{DATA.bu_categoryname}}</text>
        <text class="user-name">{{DATA.bu_author}}</text>
        <text class="time">{{ DATA.bu_pushdatetime | timeAgo }}</text>
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
  border-bottom-width: 2px;
  border-bottom-color: #eee;
  border-bottom-style: solid;
}
.text{
  line-height: 48px;
  font-size: 32px;
  color: #333;
  padding-bottom: 20px;
}
.pic-wrap{
  flex-direction:row;
  flex-wrap:wrap;
  justify-content: space-between;
  align-items:center;
}
.pic{
  width: 220px;
  height: 148px;
  margin-bottom: 16px;
}
.tim-box{
  height: 30px;
  flex-direction:row;
  justify-content: space-between;
  align-items: flex-end;
}
.lable{font-size: 20px;color: #268BE7;border-width: 2px;border-color: #268BE7;border-style: solid;width: 96px;height: 26px;line-height: 26px; text-align: center;}
.yel{border-color: #F88B26;color: #F88B26;}
.user-name{
  flex:1;font-size: 28px;color: #999;padding-left: 10px; line-height: 30px;
}
.time{color: #999;font-size: 28px;line-height: 30px;}
</style>
