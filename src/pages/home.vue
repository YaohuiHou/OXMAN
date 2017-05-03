<template>
  <div class="commont-view">
    <app-header show="1"></app-header>

    <div class="scroller">
      <list class="hot-scroller" @loadmore="getIndexAsy" loadmoreoffset="50">
        <cell>
          <hot-top :DATA="hot"></hot-top>
        </cell>
        <cell
          v-for="(items, index) in indexDATA"
          append="tree"
          :ref="'item'+index"
          :index="index"
          keep-scroll-position="true">
          <list-centent :DATA="items" :types="items.bu_authortype ? 1 : 0"></list-centent>
        </cell>
        <cell>
          <text class="indicator" v-if="showLoading">Loading ...</text>
          <text class="indicator" v-if="noLoading">～我是有底线滴～</text>
        </cell>
      </list>
    </div>

    <div v-if="attestation" class="flow-btn" @click="jump('/aution')">
      <image class="flow-pic" src="https://s.kcimg.cn/app/icon/oxman/rzs.png"></image>
      <text class="flow-txt">认证</text>
    </div>

  </div>
</template>


<script>
  import AppHeader from '../components/app-header.vue'
  import ListCentent from '../components/list-centent.vue'
  import HotTop from '../components/hot-top.vue'

  import XHR from '../api'
  const THAW = weex.requireModule('THAW')
  const modal = weex.requireModule('modal')
  export default {
    components: { AppHeader, ListCentent, HotTop },
    data () {
      return {
        showLoading: false,
        noLoading: false,
        userid:'',
        userName:'',

        hot: [],
        page:'',
        indexDATA:[],
        //是否显示认证
        attestation:false
      }
    },
    created () {
      // const me = this
      // const THAW = weex.requireModule('thaw')
      // THAW.onGetData('1',function(ret) {
      //     me.userid = ret.userid
      //     me.userName = ret.userName
      // }

      this.getManInfo()
      this.getEverHot()
      this.getIndexAsy()


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
      getEverHot () {
        let self = this
        XHR.getEveryDay().then( (res) => {
          if( res.data.status == '1'){
            self.hot = res.data.data
          }
          // 隐藏正在加载
          THAW.onHideLoading()
        })
      },
      getIndexAsy () {
        let self = this
        let json = {}
        if( this.page !== ''){
          json.time = this.page
        }
        if(!this.noLoading && !this.showLoading){
          self.showLoading = true
          XHR.getIndexAsy(json).then((res) => {
            if( res.data.status == '1'){
              self.showLoading = false
              self.page = res.data.data[res.data.data.length -1].bu_pushdatetime || ''
              if(res.data.data.length == 0){
                self.noLoading = true
              }
              if(res.data.data.length < 10 && res.data.data.length !== 0){
                self.indexDATA.push(...res.data.data)
                self.noLoading = true
              } else {
                self.indexDATA.push(...res.data.data)
              }
            }else{
              self.showLoading = false
              modal.toast({
                message: res.data.msg,
                duration: 2
              })
            }
          })
        }
      },

    }
  }
</script>


<style scoped>
.commont-view {
    flex-direction:column;
    background-color: #FAFBFC;
}
.flow-btn{
  position: fixed;
  right: 36px;
  bottom: 126px;
  width: 94px;
  height: 94px;
  border-radius: 94px;
  background-color:rgba(43,97,255,.9);
  justify-content: center;
  align-items: center;
}
.flow-txt{font-size: 20px;color: #fff;}
.flow-pic{width: 34px;height: 34px;}

.blue{color: #1571E5;}
.scroller {width: 750px; flex:1;  background-color: #FAFBFC;}
.row{padding-bottom: 20px;background-color:#FAFBFC;}
.indicator {
    height: 94px;
    color: #999;
    font-size: 32px;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
  }
</style>
