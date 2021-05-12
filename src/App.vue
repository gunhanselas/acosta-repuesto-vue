<template>
  <div id="app">
    <Header @toggleSideBar="isLeftSideBar = !isLeftSideBar"></Header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="d-flex align-items-stretch">
      <transition name="side-in">
        <LeftSideBar v-if="isLeftSideBar"></LeftSideBar>
      </transition>
      <router-view />
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import LeftSideBar from "@/components/Left-SideBar.vue";

export default {
  name: "App",
  components: {
    Header,
    LeftSideBar,
  },
  data () {
    return {
      isLeftSideBar: true,
    }
  }
};
</script>

<style scoped>
</style>
