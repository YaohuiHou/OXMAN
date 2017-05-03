<template>
  <div>
    <div class="head-box">
      <div class="top-ico-box">
        <div class="logo" @click="back">
          <image class="top-image" src="https://s.kcimg.cn/app/icon/oxman/back.png"></image>
        </div>
        <div class="add-btn" @click="share">
          <image class="top-image" src="https://s.kcimg.cn/app/icon/oxman/shll.png"></image>
        </div>
      </div>

      <div class="top-use-box">
        <div class="top-use-left">
          <image class="top-use-pic" :src="DATA.bu_imgsrc"></image>
          <image class="top-use-vip" src="https://s.kcimg.cn/app/icon/oxman/dh_qita.png"></image>
        </div>
        <div class="top-use-right">
          <text class="top-use-name">{{DATA.bu_name}}</text>
          <div v-if="DATA.wactchtype == '0'" class="top-right-box">

            <div v-if="!DATA.bu_isupvote"
            @click="zanAsy"
            class="top-zan-box top-mr">
              <image class="top-use-image" src="https://s.kcimg.cn/app/icon/oxman/zans.png"></image>
              <text class="top-use-txt">点赞</text>
            </div>

            <div v-if="DATA.bu_isupvote" class="top-zan-box top-mr isok">
              <image class="top-use-isok" src="https://s.kcimg.cn/app/icon/oxman/oky.png"></image>
              <text class="top-use-txt">已点赞</text>
            </div>

            <div v-if="!DATA.bu_isfollower" @click="singleFollowed(1)" class="top-zan-box">
              <image class="top-use-image" src="https://s.kcimg.cn/app/icon/oxman/pogz.png"></image>
              <text class="top-use-txt">关注</text>
            </div>

            <div v-if="DATA.bu_isfollower" @click="singleFollowed(2)" class="top-zan-box isok">
              <image class="top-use-isok" src="https://s.kcimg.cn/app/icon/oxman/oky.png"></image>
              <text class="top-use-txt">已关注</text>
            </div>

          </div>

          <div v-if="DATA.wactchtype == '1'" class="top-right-box">
            <div class="top-zan-box" @click="jump('/aution')">
              <text class="top-use-txt">编辑资料</text>
            </div>
          </div>

        </div>
      </div>

      <div class="head-item">
        <div class="msg">
          <text class="head-msg-nb">{{DATA.bu_fanscount}}</text><text class="head-msg">粉丝</text>
        </div>
        <div class="msg border">
          <text class="head-msg-nb">0</text><text class="head-msg">等级</text>
        </div>
        <div class="msg border">
          <text class="head-msg-nb">{{DATA.bu_clickcount}}</text><text class="head-msg">活跃度</text>
        </div>
      </div>

    </div>


    <list class="pro-box" @loadmore="loadList" loadmoreoffset="30">
      <cell
          v-for="(items, index) in LISTN"
          append="tree"
          :ref="'item'+index"
          :index="index"
          keep-scroll-position="true">
          <!-- <text class="pro-times">2017.03.02</text> -->
          <list-centent :DATA="items"></list-centent>
      </cell>
      <text class="indicator" v-if="showLoading">Loading ...</text>
      <text class="indicator" v-if="noLoading">～我是有底线滴～</text>
    </list>


    <div class="pro-fot">
      <!-- <div v-if="false" class="pro-fot-nav">
        <text class="nav-txt blu">加关注</text>
      </div>
      <div v-if="false" class="pro-fot-nav">
        <text class="nav-txt yel">已关注</text>
      </div> -->
      <div v-if="true" class="pro-fot-nav">
        <text class="nav-txt" @click="myMsg(1)">牛人原创</text>
      </div>
      <div class="pro-fot-nav">
        <text class="nav-txt" @click="myMsg(0)">圈子</text>
      </div>
    </div>
  </div>
</template>

<script>
  import ListCentent from '../components/list-centent.vue'
  import XHR from '../api'
  const modal = weex.requireModule('modal')
  const THAW = weex.requireModule('THAW')
  export default {
    components: { ListCentent },
    data (){
      return {
        showLoading: false,
        noLoading: false,
        pageN: '',
        LISTN:[],

        DATA: {}
      }
    },
    created () {
      this.initMsg()
      this.loadList()
    },
    methods: {
      share(){
        THAW.onShowShare({
            title: this.DATA.bu_name + "的牛人主页", // 分享标题
            desc: "", // 分享描述
            link: '/proc?'+ this.DATA.bu_id, // 分享链接
            imgUrl: this.DATA.bu_imgsrc // 分享图标
        });
      },
      myMsg(txt){
        if(this.DATA.wactchtype == '1'){
          if(txt == '1'){
            this.$store.commit("setBlueTxt", '我的文章')
          } else {
            this.$store.commit("setBlueTxt", '我的圈子')
          }
        } else {
          if(txt == '1'){
            this.$store.commit("setBlueTxt", `${this.DATA.bu_name}的文章`)
          } else {
            this.$store.commit("setBlueTxt", `${this.DATA.bu_name}的圈子`)
          }
        }
        this.jump({path:'/msgs',query:{id: this.$route.query.id,tp: txt}})
      },
      initMsg (){
        let self = this
        let json = {}
        json.nbuid = this.$route.query.id
        if(this.$route.query.u == '1'){
          json.UA = this.$getConfig().UA
        }
        if(this.$getConfig().UA !== 0){
          json.UA = this.$getConfig().UA
        }
        XHR.getManInfo(json).then((res) => {
          if( res.data.status == '1'){
            self.DATA = res.data.data[0]
          } else {
            modal.toast({
              message: res.data.msg,
              duration: 2
            })
          }
        })
      },

      loadList(){
        let self = this
        let json = {}
        json.nbuid = this.$route.query.id
        if( this.pageN !== ''){
          json.time = this.pageN
        }
        if(!this.noLoading && !this.showLoading){
          self.showLoading = true
          XHR.getNbTindex(json).then((res) => {
            if( res.data.status == '1'){
              self.showLoading = false
              self.pageN = res.data.data[res.data.data.length -1].bu_pushdatetime || ''
              if(res.data.data.length == 0){
                self.noLoading = true
              }
              if(res.data.data.length < 10 && res.data.data.length !== 0){
                self.LISTN.push(...res.data.data)
                self.noLoading = true
              } else {
                self.LISTN.push(...res.data.data)
              }
            } else {
              self.showLoading = false
              modal.toast({
                message: res.data.msg,
                duration: 2
              })
            }
          })
        }
      },
      singleFollowed(type){
        let self = this
        let nbbsid = [`${this.DATA.bu_id}`];
        XHR.postAttention({type:type,watchtype:2,nbbsid:JSON.stringify(nbbsid),UA:this.$getConfig().UA}).then((ele) => {
          if(ele.ok && ele.data.status == 1){
            self.DATA.bu_isfollower = !self.DATA.bu_isfollower
          }
        });
      },
      zanAsy(){
        let self = this
        let json = {}
        json.nbuid = this.DATA.bu_id
        json.UA = this.$getConfig().UA
        if(!this.DATA.bu_isupvote){
          XHR.postUpvoteAsync(json).then((res) => {
            if( res.data.status == '1'){
              self.DATA.bu_isupvote = true
            } else {
              modal.toast({
                message: res.data.msg,
                duration: 2
              })
            }
          })
        }
      }
    }
  }
</script>

<style scoped>
.backs{color: #fff; font-size: 32px;padding-left: 30px;padding-top: 30px;}
.backs-r{color: #fff; font-size: 32px;padding-right: 30px;padding-top: 30px;}
.head-box{
  height: 340px;
  background-color: #2062A9;
  background-image: url(https://s.kcimg.cn/app/icon/oxman/bg.png);
}
.top-ico-box{flex-direction:row;justify-content: space-between;align-items: center;}
.top-image{width: 38px;height: 38px;}
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
.top-use-box{flex-direction:row; justify-content:flex-start; align-items:center;}
.top-use-left{width: 124px; height: 124px; margin-left: 30px; margin-right: 20px; position: relative; border-radius: 124px;}
.top-use-pic{width: 120px; height: 120px; border-radius: 120px; border-width: 2px;border-color: #fff;border-style: solid;}
.top-use-name{font-size: 36px; color: #fff;margin-bottom: 14px;}
.top-right-box{flex-direction:row; justify-content:flex-start; align-items:center;}
.top-zan-box{width: 132px; height: 50px; border-width: 2px; border-radius: 8px; border-color: #fff;border-style: solid; flex-direction:row; justify-content:center; align-items:center;}
.top-use-image{width: 24px; height: 24px; margin-right: 20px;}
.top-use-txt{font-size: 24px; color: #fff;}
.top-mr{margin-right: 60px;}
.top-use-isok{width: 24px;height: 16px; margin-right: 10px;}

.head-msg-nb{font-size: 32px; color: #fff;}

.top-use-vip{position: absolute; right: 0;bottom: 10px; width: 28px; height: 28px;}
.head-item{
  padding-top: 30px;
  flex:1;
  flex-direction:row;
  justify-content: space-around;
  align-items: center;
}
.msg{flex:1;justify-content: center;align-items: center;}
.head-msg{
  color: #fff;
  font-size: 24px;
}
.pro-times{font-size: 24px; color: #ccc; height: 48px; background-color: #F7F9FA; text-align: center; line-height: 48px;}
.pro-box{flex:1;}
.border{border-left-style: solid; border-left-color: #fff;border-left-width: 2px;}
.pro-fot{
  height: 98px;
  flex-direction:row;
  justify-content: space-between;
  align-items: center;
  background-color: #FAFBFC;
}
.pro-fot-nav{
  flex:1;
  flex-direction:row;
  justify-content: center;
  align-items: center;
}

.isok{background-color: rgba(0,0,0,.1); border-color: rgba(0,0,0,.1);}
.nav-txt{color: #666;font-size: 34px; padding-left: 20px;}
.blu{color: #2062A9;}
.yel{color: #ff9800;}
.reds{color: #ff5722;}


.indicator {
    height: 94px;
    color: #999;
    font-size: 32px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
