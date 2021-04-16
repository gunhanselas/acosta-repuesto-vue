<template>
  <div>
    <header class="header">
      <nav class="navbar navbar-expand-lg px-4 py-2 bg-white shadow">
        <a
          href="#"
          class="sidebar-toggler text-gray-500 mr-4 mr-lg-5 lead"
          @click="sidebarClass"
          ><i class="fas fa-align-left"></i
        ></a>
        <router-link to="/"
          ><a
            class="navbar-brand font-weight-bold text-uppercase text-base"
            >Acosta Repuestos</a
          ></router-link
        >
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    sidebarClass() {
      let elementDOM = document.getElementsByClassName("sidebar")[0].classList;
      elementDOM.toggle("show");
      elementDOM.toggle("shrink");
    },
  },
};
</script>