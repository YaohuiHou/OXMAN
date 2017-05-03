<template>
  <div class="commont-view">
    <app-header show="2"></app-header>

    <div class="star-box">
      <div class="star-lef">
        <text :class="['lefTxt',categorySelected==0?'lefAct':'']" @click="switchList(0)">已关注</text>
        <text v-for="ele in categoryList" :class="['lefTxt',categorySelected == ele.bu_categoryid ? 'lefAct' : '']" @click="switchList(ele.bu_categoryid)">{{ele.bu_categoryname}}</text>
      </div>

      <div class="star-rit">
        <text v-if="!isLogin" class="ritBtn" @click="goLogin">您还未登录 马上登录</text>
        <div v-if="emptyList">
          <text class="ritWelx">您还未订阅任何牛人，快去订阅一波</text>
          <text class="ritTit">推荐关注</text>
        </div>

        <str-item v-if="isLogin" :followedList="followedList"></str-item>
      </div>
    </div>
    <div v-if="followedSuccessShow" class="oneAlert">
      <image class="alertImg" src="https://s.kcimg.cn/app/icon/oxman/alert.png"></image>
      <div class="altClsBox" @click="closeFollowedSuccess">
        <image class="alertClox" src="https://s.kcimg.cn/app/icon/oxman/gzg.png"></image>
      </div>
    </div>

    <flow v-if="RecommendAttentionShow" :RecommendAttentionList="RecommendAttentionList" @batchFollowed="batchFollowed" @skipBatchFollowed="skipBatchFollowed"></flow>
  </div>
</template>

<script>
  import AppHeader from '../components/app-header.vue'
  import StrItem from '../components/str-item.vue'
  import flow from '../components/flow.vue'
  import XHR from '../api'

  const modal = weex.requireModule('modal')
  const storage = weex.requireModule('storage')

  export default {
    components: { AppHeader, StrItem,flow},
    data () {
      return {
        text: '',

        //用户是否登陆
        isLogin:true,
        //分表标签列表
        categoryList:[],
        //显示的分类标签
        categorySelected:0,
        //没有关注任何牛人
        emptyList:false,
        //已关注列表
        followedList:[],
        //推荐关注列表
        RecommendAttentionList:[],
        //是否显示推荐关注列表
        RecommendAttentionShow:false,
//        关注成功弹层
        followedSuccessShow:false,
        //是否显示我的
        attestation:false
      }
    },
    created(){

//      //判断是否第一次进入关注页面
//      storage.getItem('RecommendAttention',(ele) => {
//        if(ele.result != 'success'){
//          router.push('/flow')
//        }
//      });

      //如果用户未登录
      if(this.$getConfig().userId == 0){
        this.isLogin = false
      }else{
        //判断是不是第一次进入 ？ 显示推荐关注列表 ： 不显示
        storage.getItem('RecommendAttention', ele => {
          if(ele.result != 'success'){
            this.RecommendAttentionShow = true;
            //请求分类标签接口
            XHR.getRecommendAttention().then((res) => {
              if(res.ok && res.data.status == 1){
                this.RecommendAttentionList = res.data.data;
              }
            });
          }else{
            //请求接口列表
            this.getFollowed();
          }
        });

        //请求分类标签接口
        XHR.getCategoryList().then((res) => {
          if(res.ok && res.data.status == 1){
            this.categoryList = res.data.data;
          }
        });
      }

    },
    methods: {
      onchange (e) {
        modal.toast({
          message: 'oninput',
          duration: 0.8
        })
      },
      //去登陆
      goLogin(){
        weex.requireModule('THAW').onGoLogin();
      },
      //请求接口列表
      getFollowed(){
        //请求已关注列表
        XHR.getFollowed({UA:this.$getConfig().UA,'currentPage':1}).then((res) => {
          if(res.ok && res.data.status == 1){
            this.followedList = res.data.data;
            if(res.data.msg == "推荐列表"){
              this.emptyList = true;
            }else{
              this.emptyList = false;
            }
          }
        });
      },
      //点击切换关注列表
      switchList(id){
        this.categorySelected = id;

        let ajaxName = 'getFollowed';
        let o = {};
        o.currentPage = 1;
        o.UA = this.$getConfig().UA;

        if(id != 0){
          ajaxName = 'getFollowedCategoryList';
          o.categoryid = id;
          this.emptyList = false;
        }

        //请求已关注列表
        XHR[ajaxName](o).then((res) => {
          if (res.ok && res.data.status == 1) {
            this.followedList = res.data.data;
            if(res.data.msg == "推荐列表"){
              this.emptyList = true;
            }else{
              this.emptyList = false;
            }
          }
        });
      },
      //九宫格批量关注
      batchFollowed(nbbsid){
        XHR.postAttention({
          type: 1,
          watchtype: 1,
          nbbsid: nbbsid,
          UA: this.$getConfig().UA
        }).then((ele) => {
          if (ele.ok && ele.data.status == 1) {
            this.RecommendAttentionShow = false;
            //请求关注列表
            this.getFollowed();
            storage.setItem('RecommendAttention',true)
            storage.getItem('followedSuccess', (ele) => {
              if (ele.result != 'success') {
                this.followedSuccessShow = true;
              }
            })
          }
        });
      },
      //跳过一键关注
      skipBatchFollowed(){
          //请求关注列表
          this.getFollowed()
          storage.setItem('RecommendAttention',true)
          this.RecommendAttentionShow = false;
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
  .commont-view {background-color: #f5f5f5;}
  .star-box{ flex:1; flex-direction: row;justify-content: flex-start;
  align-items:stretch;}
  .star-lef{ width: 150px;}
  .star-rit{ flex:1; background-color: #fff;padding-left: 30px;}

  .ritBtn{width:536px;height:80px; border-width: 2px; border-style: solid;border-color: #2B61FF; text-align: center; line-height: 80px; font-size: 32px; color: #2B61FF; border-radius: 4px; margin-top: 140px;}

  .lefTxt{height: 84px; text-align: center; line-height: 84px;font-size: 32px; color: #333; border-bottom-width: 4px; border-bottom-color:#f5f5f5; border-bottom-style: solid;}
  .lefAct{border-bottom-color:#2B61FF; background-color: #fff; color:#2B61FF;}

  .ritWelx{font-size: 28px; color: #999; text-align: center;margin-top: 60px; margin-bottom: 30px;}
  .ritTit{font-size: 36px; color: #333; text-align: center;}

  .oneAlert{width:750px; height: 1246px; position: absolute;top: 88px; left: 0; background-color: rgba(0,0,0,.6); justify-content: center;
  align-items:center;}
  .alertImg{ width: 534px; height: 612px;}
  .altClsBox{width: 60px; height:60px; border-radius: 60px; border-width: 2px; border-color: #fff;border-style: solid; margin-top: 60px;justify-content: center;align-items:center;}
  .alertClox{ width: 30px; height:30px; -webkit-transform:rotate(45deg);}
</style>
