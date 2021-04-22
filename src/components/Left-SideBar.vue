<template>
  <div id="sidebar" class="sidebar py-3">
    <div
      class="text-gray-400 text-uppercase px-3 px-lg-4 py-4 font-weight-bold small headings-font-family"
    >
      MENÚ
    </div>
    <ul class="sidebar-menu list-unstyled">
      <router-link
        tag="a"
        to="/"
        class="sidebar-link text-muted sidebar-list-item"
        :class="this.$router.currentRoute.path === '/' ? 'active' : ''"
        exact
      >
        <i class="fas fa-home mr-4 text-gray my-2"></i
        ><span>Home</span>
      </router-link>
      <router-link
        tag="a"
        to="/categorias"
        class="sidebar-link text-muted sidebar-list-item"
        :class="this.$route.path === '/categorias' ? 'active' : ''"
      >
        <i class="fa fa-list-alt mr-4 text-gray my-2"></i
        ><span>Categorias</span>
      </router-link>
      <li class="sidebar-list-item">
        <a href="marca.html" class="sidebar-link text-muted">
          <i class="fas fa-list-ul mr-4 text-gray my-2"></i><span>Marca</span>
        </a>
      </li>
      <router-link
        tag="a"
        to="/productos"
        class="sidebar-link text-muted sidebar-list-item"
        :class="this.$route.path === '/productos' ? 'active' : ''"
      >
        <i class="fas fa-boxes mr-3 text-gray my-2"></i><span>Productos</span>
      </router-link>
      <li class="sidebar-list-item">
        <a href="ordenes.html" class="sidebar-link text-muted">
          <i class="fas fa-clipboard-check mr-4 text-gray my-2"></i
          ><span>Ordenes</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {},
  // computed: {
  //   actClass(path) {
  //     console.log(this.$router.currentRoute.path);
  //     return this.$router.currentRoute.path;
  //   },
  // },
};
</script>