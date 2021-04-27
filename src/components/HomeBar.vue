<template>
  <div class="container-fluid px-xl-5">
    <div
      style="
        box-shadow: 0 0.125rem 0.8rem rgba(0, 0, 0, 0.1);
        margin-top: 1rem;
        border-radius: 25px;
        overflow: hidden;
      "
    >
      <img src="/img/acosta.png" alt="..." style="max-width: 100%" />
    </div>
    <h1 style="text-align: center; margin-top: 2rem; margin-bottom: 0">
      Esto es lo que puedes hacer:
    </h1>
    <div class="cuadros-home">
      <div class="cuadro1-home">
        <router-link to="/productos">
          <img src="/img/motul.png" alt="..." style="max-width: 100%" />
          <div
            class="font-weight-bold d-block"
            style="margin: 1rem; font-size: 2.5rem"
          >
            Productos
          </div>
          <div class="cuadros-text-home">
            Editar, eliminar, agregar o listar
          </div>
        </router-link>
      </div>
      <div class="cuadro2-home">
        <router-link to="/marcas">
          <img src="/img/2.png" alt="..." style="max-width: 100%" />
          <div
            class="font-weight-bold d-block"
            style="margin: 1rem; font-size: 2.5rem"
          >
            Marcas
          </div>
          <div class="cuadros-text-home">
            Editar, eliminar, agregar o listar
          </div>
        </router-link>
      </div>
    </div>
    <div class="cuadros-home">
      <div class="cuadro3-home">
        <router-link to="/categorias">
          <img src="/img/3.png" alt="..." style="max-width: 100%" />
          <div
            class="font-weight-bold d-block"
            style="margin: 1rem; font-size: 2.5rem"
          >
            Categorias
          </div>
          <div class="cuadros-text-home">
            Editar, eliminar, agregar o listar
          </div>
        </router-link>
      </div>
      <div class="cuadro4-home">
        <img src="/img/4.png" alt="..." style="max-width: 100%" />
        <div
          class="font-weight-bold d-block"
          style="margin: 1rem; font-size: 2.5rem"
        >
          Ordenes
        </div>
        <div class="cuadros-text-home">Eliminar, agregar o listar</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
a:hover,
a:focus {
  color: #ffffff;
  text-decoration: none;
}
a {
  color: #212529;
}
</style>