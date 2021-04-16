<template>
  <div class="page-holder w-100 d-flex flex-wrap">
    <HomeBar></HomeBar>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBar from "@/components/HomeBar.vue";

export default {
  name: "Home",
  components: {
    HomeBar,
  },
};
</script>
