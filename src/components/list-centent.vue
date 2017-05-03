<template>
  <div class="main-list" @click="goMsg">
      <list-share
      v-if="DATA.bu_mainimgjson.length === 1 ? true : false"
      :DATA="DATA"
      ></list-share>
      <list-pic
      v-if="DATA.bu_mainimgjson.length === 1 ? false : true"
      :DATA="DATA"
      ></list-pic>
  </div>
</template>

<script>
  import listShare from './list-share.vue'
  import listPic from './list-pic.vue'
  export default {
    components: {listShare,listPic},
    props: {
      types: {
        type: Number,
        default: 1
      },
      DATA: {
        bu_mainimgjson:[]
      }
    },
    methods: {
      goMsg () {
        this.$store.commit('setComTU',{tit:this.DATA.bu_title,url:this.DATA.bu_articleurl})
        this.jump({path:'/pages',query:{id: this.DATA.bu_articleid,tp: this.types}})
      }
    }
  }
</script>

<style scoped>
.main-list{
  padding-left: 30px;
  padding-right: 30px;
  background-color: #fff;
}
</style>
