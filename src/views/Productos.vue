<template>
  <div id="domVue" class="page-holder w-100 d-flex flex-wrap">
    <div class="container-fluid px-xl-5">
      <div style="margin-top: 2rem">
        <div class="card">
          <div class="card-header">
            <h6 class="text-uppercase mb-0" style="display: inline-block">
              Productos
            </h6>
            <button
              type="button"
              @click="clearData()"
              class="btn btn-success"
              style="float: right"
              data-toggle="modal"
              data-target="#agregarProducto"
            >
              <i class="fa fa-plus" aria-hidden="true"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="form-group position-relative mb-0">
              <button
                type="submit"
                style="top: -3px; left: 0"
                class="position-absolute bg-white border-0 p-0"
              >
                <i class="o-search-magnify-1 text-gray text-lg"></i>
              </button>
              <input
                type="search"
                v-model="searchDisplay"
                placeholder="Buscar producto..."
                class="form-control form-control-sm border-0 no-shadow pl-4"
              />
            </div>

            <b-nav tabs fill>
              <b-nav-item v-for="(cat,index) in categorias" :key="index" :active="tab === cat.nombreCat" @click="tab = cat.nombreCat">{{cat.nombreCat}}</b-nav-item>
            </b-nav>

            <table class="table card-text table-hover">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th>Operaciones</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(prod, index) in productos"
                  v-show="filtro(index) && prod.nombreCategoria===tab"
                  :key="index"
                >
                  <th>{{ prod.upc }}</th>
                  <td>{{ prod.nombreProd }}</td>
                  <td>{{ prod.nombreMarca }}</td>
                  <td>{{ prod.nombreCategoria }}</td>
                  <td>${{ prod.precioUnit }}</td>
                  <td>{{ prod.descripcion }}</td>
                  <td>{{ prod.stockProd }}</td>
                  <td>
                    <button
                      type="button"
                      @click="getProductoSelected(prod)"
                      class="btn btn-danger"
                      data-toggle="modal"
                      data-target="#eliminarProducto"
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </button>
                    <button
                      type="button"
                      @click="getProductoSelected(prod)"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#editarProducto"
                    >
                      <i class="fa fa-edit" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AgregarCat from "@/components/Categorias/AgregarCat.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Productos",
  components: {
    // AgregarCat,
  },
  data: () => {
    return {
      displayOption: "",
      searchDisplay: "",
      urlApi: `http://localhost:8080/categoria`,
      tab: ""
    };
  },
  methods: {
    ...mapMutations("categorias", ["clearData", "getCategoriaSelected"]),

    filtro(valor) {
      if (this.searchDisplay.trim() === "") return true;
      let array = (
        this.productos[valor].nombreProd +
        this.productos[valor].descripcion +
        this.productos[valor].precioUnit +
        this.productos[valor].stockProd +
        this.productos[valor].upc
      ).toUpperCase();
      return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
    },
  },
  computed: {
    ...mapState("productos", ["productos", "producto"]),
    ...mapState("categorias", ["categorias"]),
  },
  /*
    hook para inicializar los valores de la tabla
     */
  mounted() {
    //para setear como active el tab del inicio
    this.tab=this.categorias[0].nombreCat

    //this.getAll();
  },
};
</script>