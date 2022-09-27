<template>
  <div>
    <app-header></app-header>
    <router-view v-if="!this.$store.state.user.loading"></router-view>
    <loaders v-else></loaders>
  </div>
</template>


<script>
import appHeader from './components/Header/Header.vue';
import Loaders from './components/Utils/loaders.vue';
import { mapGetters } from 'vuex';


  export default {
    components:{
    appHeader,
    Loaders
},
computed:{
  ...mapGetters({
    error: 'getError'
  })
},
watch:{
  error(error){
    if (error[0]===true) {
      this.$toast.error(error[1]);
      
    }
  }
}
    // created(){
    //   this.$store.dispatch('autoLogin')
    // }
  }
</script>


<style>
  @import './assets/style.css';
</style>