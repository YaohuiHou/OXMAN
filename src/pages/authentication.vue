<template>
  <div class="commont-view">
    <w-header v-if="headerType==1" titles="牛人认证"></w-header>
    <app-header v-else :show="show"></app-header>

    <div class="pop-box">

      <div class="pop-item" @click="loadHeadPortrait">
        <div class="pop-pic-box">
          <image class="pop-pic" :src="Data.bu_facelogo"></image>
          <image class="top-use-vip" src="https://s.kcimg.cn/app/icon/oxman/dh_qita.png"></image>
        </div>
        <text class="pop-name">上传头像</text>
      </div>

    </div>

    <div class="input-box">
      <text class="input-txt">牛人名称：</text>
      <input class="input" type="text" placeholder="2-8个字" :value="Data.bu_manname" @input="addInfo('name')"/>
    </div>

    <div class="input-box">
      <text class="input-txt">个人简介：</text>
      <textarea class="input textarea" placeholder="5-20个字以内" :value="Data.bu_manintroduction" @input="addInfo('intro')"></textarea>
    </div>

    <div class="input-box">
      <text class="input-txt">联系电话：</text>
      <input class="input" type="text" placeholder="请输入您的电话" :value="Data.bu_manphone" @input="addInfo('phone')"/>
    </div>

    <div class="input-box post">
      <text class="input-txt">标签属性：</text>
      <text @click="selectVal('fold')" class="input">{{typeVal}}</text>
      <image class="input-picos" src="https://s.kcimg.cn/app/icon/oxman/backs.png"></image>
    </div>

    <div :class="['button','mt60','buts']" @click="submitData">
      <text class="but-txt">提交</text>
    </div>

    <select-ops v-if="selectOk" v-on:hideSlt="selectVal" :types="typeVal" :DATA="select"></select-ops>
  </div>
</template>

<script>
  import WHeader from '../components/w-header.vue'
  import AppHeader from '../components/app-header.vue'
  import SelectOps from '../components/select.vue'
  import router from '../router'
  const modal = weex.requireModule('modal')
  let globalEvent = weex.requireModule('globalEvent');
  // const picker = weex.requireModule('picker')
  import XHR from '../api'
  export default {
    components: { WHeader, AppHeader, SelectOps },
    data () {
      return {
        selectOk: false,
        //1：认证  2：修改资料
        headerType:1,
        //提交资料
        Data:{
          UA:'',
          //头像
          bu_facelogo:'https://i.kcimg.cn/data/avatar/noavatar_big.gif-120x120.jpg',
          //姓名
          bu_manname:'',
          //电话
          bu_manphone:'',
          //简介
          bu_manintroduction:'',
          //属性分类
          bu_categoryid:'',
        },

        typeVal:'',
        typeNum: 0,


        select: [],

        //提交按钮状态
        submitDisabled:false,
        logo:'',
        name:'',
        phone:'',
        msg:'',
        cateid:'',
        show : "1"

      }
    },
    created () {
//      getNbInfo
//      this.headerType = this.$store.state.attestation;
      this.Data.UA = this.$getConfig().UA;

//      如果是修改个人资料，请求个人资料数据
        XHR.getNbInfo({'nbuid':this.$getConfig().userId}).then((ele) => {
          if(ele.ok && ele.data.status == 1){
            let NbInfo = ele.data.data[0];
            this.Data.bu_facelogo = NbInfo.bu_imgsrc;
            this.Data.bu_manname = NbInfo.bu_name;
            this.Data.bu_manphone = NbInfo.bu_manphone;
            this.Data.bu_manintroduction = NbInfo.bu_manintroduction;
            this.Data.bu_categoryid = NbInfo.bu_categoryid;
            this.typeVal = NbInfo.bu_categoryname;
            this.buttonState()

            this.headerType = 2
            this.show = 3
          }else{
            this.headerType = 1
            this.show = 1
          }
        })
      // 登录
      if(this.$getConfig().userId <= 0){
        weex.requireModule('THAW').onGoLogin();
        // globalEvent.addEventListener('onGoLoginCallBack',function(data){
        //   modal.toast({
        //     message: data,
        //     duration: 100
        //   })
        // })
      };
      // 上传图片
      globalEvent.addEventListener('chooseImageCallBack',(res) => {
        this.Data.bu_facelogo =  res.imageUpload;
      });

    },
    methods: {
      alert (text) {
        modal.toast({
          message: text,
          duration: 0.8
        })
      },
      selectVal (nb,content) {
        // console.log(nb)
        if(nb == 'fold'){
          XHR.getTagAttributes().then((ele) => {
            if(ele.ok && ele.data.status == 1){
              this.select = ele.data.data;
            }
          })
        }else if(nb != -1){
          this.typeVal = content;
          this.Data.bu_categoryid = nb;
        }
//        if( nb !== -1 && typeof nb == 'number') {
//          this.typeVal = this.select[nb].bu_categoryname
//          this.typeNum = this.select[nb].bu_categoryid
//        }
        this.selectOk = !this.selectOk
        this.buttonState()
      },
      //编辑资料
      addInfo(type){
        if(type == 'name'){
          this.Data.bu_manname = event.value;
        }else if(type == 'intro'){
          this.Data.bu_manintroduction = event.value;
        }else if(type == 'phone'){
          this.Data.bu_manphone = event.value;
        }
        this.buttonState()
      },
      buttonState(){
        if(this.Data.bu_manname != '' && this.Data.bu_manphone != '' && this.Data.bu_categoryid !== ''){
          this.submitDisabled = false
        }else{
          this.submitDisabled = true
        }
      },
      submitData(){
        // if(this.submitDisabled){
        //   return
        // }
        let type = 'postNbAuthentication';
        //如果是修改个人资料，提交修改个人资料数据
        if(this.headerType ==2){
          type = 'getEditNBMan';
        }
        XHR[type](this.Data).then((ele) => {
          if (ele.ok && ele.data.status == 1) {
            this.alert('修改成功');
            this.$nextTick(function(){
              router.go(-1)
            })
          }else{
            this.alert(ele.data.msg)
          }
        })

      },
      pick () {
        // var items = new Array("法律援助","Volvo","BMW")
        // var self = this
        // picker.pick({
        //     'items':items,
        //     'index':self.index
        // },function (ret) {
        //     var result = ret.result
        //     if(result == 'success')
        //     {
        //         self.value = items[ret.data]
        //         self.index = ret.data
        //     }
        // })


        let self = this
        XHR.getNoteName().then((res) => {
          if( res.data.status == '1'){
            self.select = res.data.data
          }
        })
      },
//      上传图片
      loadHeadPortrait(){
        //   native操作
        weex.requireModule('THAW').chooseImage();


      }
    }
  }
</script>
<style scoped>
  .commont-view {background-color: #fff;}

  .mt60{margin-top: 120px;}

  .pop-box{
    height: 314px;
    margin-top: 20px;
    flex-direction:row;
    justify-content: center;
    align-items:center;
  }

  .pop-item{width: 250px; height: 200px; position: relative;
    justify-content: center;
    align-items:center;
    margin-top: 46px;
  }
  .pop-pic{width: 140px;height: 140px; border-radius: 140px;}
  .pop-name{font-size: 32px; color: #333; margin-top: 20px; text-decoration: underline;}

  .pop-pic-box{ background-image:url(https://s.kcimg.cn/app/icon/oxman/che.png); width: 140px;height: 140px; background-repeat: no-repeat; background-size: contain; background-position:0; border-style: solid; border-width: 2px; border-color: #e5e5e5; border-radius: 140px; position: relative;}
  .top-use-vip{position: absolute; right: 0;bottom: 10px; width: 28px; height: 28px;}
  .blue{ background-color: #2c63ff;}
  .button{ background-image:linear-gradient(to top,#e5e5e5,#eee); width: 690px; height: 88px; border-radius: 16px; margin-left: 30px; }
  .buts{background-image:linear-gradient(to top,#2c63ff,#5296ff);}
  .but-txt{ font-size: 36px; color: #fff; height: 88px; text-align: center; line-height: 88px;}

  .input-box{flex-direction:row;align-items:flex-start;padding-left: 30px; padding-right: 30px; padding-top: 30px;}
  .input-txt{width: 222px; font-size: 32px;color: #333; line-height: 80px;}
  .input{flex:1; background-color: #f5f5f5;height: 80px; padding-left: 20px; border-radius: 16px; line-height: 80px; font-size: 28px;border-width: 0;}
  .textarea{height: 124px;}

  .post{position: relative;}
  .input-picos{width: 30px; height: 30px; -webkit-transform:rotate(-90deg); position: absolute;right: 60px; top: 56px;}
</style>
