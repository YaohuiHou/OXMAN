export default {
  methods: {
    jump (to) {
      if (this.$router) {
        this.$router.push(to)
      }
    },
    back (){
        let thaw = weex.requireModule('THAW');
        if(this.$router && this.$route.path != "/home"){
          this.$router.back();
        }else{
          thaw.onGoBack();
        }
    }
  }
}
