<template>
  <div class="commont-view">
    <app-header show="3"></app-header>

    <list class="con-box"
      v-if="actTab == '2' && ArticleList.length > 0 ? true : false " @loadmore="getNbArtList" loadmoreoffset="30">
       <cell
        v-for="(items, index) in ArticleList"
        append="tree"
        :ref="'item'+index"
        :index="index"
        keep-scroll-position="true">
        <my-new :items="items"></my-new>
      </cell>
      <cell>
        <text class="indicator" v-if="aLoading">Loading ...</text>
        <text class="indicator" v-if="aNoLoading">～我是有底线滴～</text>
      </cell>
    </list>

    <list class="con-box"
      v-if="actTab == '1' && CircleList.length > 0 ? true : false" @loadmore="getBbsNbCircleList" loadmoreoffset="30">
       <cell
        v-for="(items, index) in CircleList"
        append="tree"
        :ref="'item'+index"
        :index="index"
        keep-scroll-position="true">
        <my-circle :items="items" :inx="index" @put="pusht"></my-circle>
      </cell>
      <cell>
      <text class="indicator" v-if="showLoading">Loading ...</text>
      <text class="indicator" v-if="noLoading">～我是有底线滴～</text>
      </cell>
    </list>

    <div v-if="actTab == '2' && ArticleList.length === 0 ? true : false" class="null-box">
      <image class="null-img" src="https://s.kcimg.cn/app/icon/oxman/null.png"></image>
      <text class="null-txt">您还没有发布任何文章</text>
    </div>

    <div v-if="actTab == '1' && CircleList.length === 0 ? true : false" class="null-box">
      <image class="null-img" src="https://s.kcimg.cn/app/icon/oxman/null.png"></image>
      <text class="null-txt">圈子为空</text>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import Tabbar from '../components/tabbar.vue'
  import MyNew from '../components/my-new.vue'
  import MyCircle from '../components/my-circle.vue'
  import XHR from '../api'
  const modal = weex.requireModule('modal')
  export default {
    data(){
      return {
        showLoading: false,
        noLoading: false,
        cPage:1,
        //圈子id
        circleId:'',
        //圈子列表
        CircleList:[],
        //文章列表
        ArticleList:[],
        aPage:1,
        aLoading: false,
        aNoLoading: false,
      }
    },
    components: { AppHeader, Tabbar, MyNew, MyCircle },
    computed: {
      // 焦点菜单
      actTab () {return this.$store.state.tabbar}
    },
    created(){

      //获取个人信息
      XHR.getBbsUserInfo({uid:this.$getConfig().userId}).then((ele) => {
        if(ele.ok){
          //如果创建过圈子
          if(ele.data.data.subForum){
              this.circleId = ele.data.data.subForum.id;
              //获取圈子列表
              this.getBbsNbCircleList();
          }
        }
      })

      this.getNbArtList()

    },
    methods: {
      //获取圈子列表
      getBbsNbCircleList(){
        let self = this
        let json = {}
        json.nbuid = this.$getConfig().userId
        // json.currentPage = this.cPage
        if(!this.noLoading && !this.showLoading){
          self.showLoading = true
          XHR.getBbsNbCircleList(json).then((ele) => {
            if(ele.ok && ele.data.status == 1){
              self.showLoading = false
              if(ele.data.data.nextPageToken == '-1'){
                self.noLoading = true
              }
              self.CircleList.push(...ele.data.data.threadslist)
            } else {
              self.showLoading = false
              modal.toast({
                message: ele.data.msg,
                duration: 2
              })
            }
          })
        }
      },

      // 请求文章列表
      getNbArtList () {
        let self = this
        let json = {}
        json.UA = this.$getConfig().UA
        json.page = this.aPage
        json.pagesize = 20
        if(!this.aNoLoading && !this.aLoading){
          self.aLoading = true
          XHR.getNbArticleList(json).then((ele) => {
            if(ele.ok && ele.data.status == 1){
              if (ele.data.data.length < 20) {
                self.aNoLoading = true
              }
              this.ArticleList.push(...ele.data.data)
            } else {
              self.aLoading = false
              modal.toast({
                message: ele.data.msg,
                duration: 2
              })
            }
          })
        }
      },

      // 推送
      pusht (obj,inx){
        let self = this
        let json = {}
        json.bu_articleid = obj.tid
        json.bu_title = obj.subject
        json.bu_authorid = obj.authorid
        json.bu_author = obj.author
        json.bu_mainimgjson = obj.images.length == 0 ? '[]' : `["${obj.images[0]}"]`
        json.UA = this.$getConfig().UA
        XHR.postPushAsyn(json).then((ele) => {
          if(ele.ok && ele.data.status == 1){
            self.CircleList[inx].sync = true
          } else {
            modal.toast({
              message: ele.data.msg,
              duration: 2
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
.con-box{
  flex:1;
  padding-bottom:98px;
  height: 1246px;
}
.null-box{flex:1; justify-content:center; align-items:center;}
.null-img{width: 400px; height: 300px;}
.null-txt{font-size: 28px; color: #999; margin-top: 40px;}
.indicator {
    height: 94px;
    color: #999;
    font-size: 32px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
