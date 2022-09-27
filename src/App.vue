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


  export default {
    components:{
    appHeader,
    Loaders
},
    // created(){
    //   this.$store.dispatch('autoLogin')
    // }
  }
</script>


<style>
  @import './assets/style.css';
</style>