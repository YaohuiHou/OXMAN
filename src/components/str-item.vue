<template>
<div>
  <div v-for="(ele,index) in followedList" class="ritItem">
    <image class="ritPic" :src="ele.bu_imgsrc"
      @click="jump({path:'/proc',query:{id: ele.bu_id}})"></image>
    <div class="ritCenBox" @click="jump({path:'/proc',query:{id: ele.bu_id}})">
      <text class="ritCenName">{{ele.bu_name}}</text>
      <text class="ritCenNmb">{{ele.followercount}}人关注</text>
    </div>

    <div v-if="ele.bu_isfollower" class="ritStrBtn isok" @click="singleFollowed(2,ele.bu_id,index)">
      <text class="ritButTxt isokTxt">已关注</text>
    </div>

    <div v-else class="ritStrBtn" @click="singleFollowed(1,ele.bu_id,index)">
      <image class="ritSico" src="https://s.kcimg.cn/app/icon/oxman/gzg.png"></image>
      <text class="ritButTxt">关注</text>
      <!--<text class="ritButTxt">已关注</text>-->
    </div>

  </div>
  <div v-if="followedSuccessShow" class="oneAlert">
    <image class="alertImg" src="https://s.kcimg.cn/app/icon/oxman/alert.png"></image>
    <div class="altClsBox" @click="closeFollowedSuccess">
      <image class="alertClox" src="https://s.kcimg.cn/app/icon/oxman/gzg.png"></image>
    </div>
  </div>
</div>
</template>
<script>
  import XHR from '../api'
  const storage = weex.requireModule('storage');
  export default {
    props:['followedList'],
    data () {
      return {
        followedSuccessShow:false
      }
    },
    methods: {
      //单个关注
      singleFollowed(type,id,index){
        // // 判断去登录
        // if(this.$getConfig().userId <= 0){
        //   weex.requireModule('THAW').onGoLogin();
        // }
        let nbbsid = [id]
        XHR.postAttention({
          type:type,watchtype:1,
          nbbsid:JSON.stringify(nbbsid),
          UA:this.$getConfig().UA
        }).then((ele) => {
          if(ele.ok && ele.data.status == 1){
            this.followedList[index].bu_isfollower = !this.followedList[index].bu_isfollower;
            //查看是否是关注
            if(type == 1){
              //查看是否已经弹出过弹层，
              storage.getItem('followedSuccess', (ele) => {
                if (ele.result != 'success') {
                  this.followedSuccessShow = true
                }
              })
            }
          }
        })
      },
      //关闭关注成功弹层
      closeFollowedSuccess(){
        this.followedSuccessShow = false;
        storage.setItem('followedSuccess',true)
      },
    }
  }
</script>
<style scoped>
  .ritItem{flex-direction: row;justify-content: space-between;align-items:center;border-bottom-style: solid;border-bottom-width: 2px; border-bottom-color:#e5e5e5; height: 140px;}
  .ritPic{width: 80px;height: 80px; border-radius: 80px;}
  .ritStrBtn{height: 52px;width: 128px;margin-right: 30px; background-color: #2B61FF; color: #fff; flex-direction:row;justify-content: center;align-items:center; border-radius: 10px;border-width: 2px; border-color:#2B61FF; border-style: solid; }
  .ritSico{width: 24px; height: 24px; margin-right: 10px;}
  .ritButTxt{font-size: 28px; color: #fff;}

  .ritCenBox{flex:1; padding-left: 20px;}

  .ritCenName{font-size: 28px; color: #333;}
  .ritCenNmb{font-size: 24px; color: #999;}
  .isok{ border-color: #e5e5e5; background-color: #fff;}
  .isokTxt{ color: #555;}
  .oneAlert{width:750px; height: 1246px; position: absolute;top: 88px; left: 0; background-color: rgba(0,0,0,.6); justify-content: center;
    align-items:center;}
  .alertImg{ width: 534px; height: 612px;}
  .altClsBox{width: 60px; height:60px; border-radius: 60px; border-width: 2px; border-color: #fff;border-style: solid; margin-top: 60px;justify-content: center;align-items:center;}
  .alertClox{ width: 30px; height:30px; -webkit-transform:rotate(45deg);}
</style>
