<template>
  <div id="app">
    <Header></Header>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <div class="d-flex align-items-stretch">
      <LeftSideBar></LeftSideBar>
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
};
</script>

