<template>
  <div id="domVue" class="page-holder w-100 d-flex flex-wrap">
    <div class="container-fluid px-xl-5">
      <div style="margin-top: 2rem; margin-bottom: 3rem">
        <div class="card">
          <div class="card-header">
            <h6 class="text-uppercase mb-0" style="display: inline-block">
              Productos
            </h6>
            <b-button variant="success" v-on:click="addProd()">
              <i class="fa fa-plus" aria-hidden="true"></i>
            </b-button>
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
              <b-nav-item
                v-for="cat in categorias"
                :key="cat.nombreCat"
                :active="tab === cat.nombreCat"
                @click="tab = cat.nombreCat"
                >{{ cat.nombreCat }}</b-nav-item
              >
            </b-nav>

            <table class="table card-text table-hover">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Stock</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(prod, index) in newProd"
                  v-show="
                    filtro(index) &&
                    prod.nombreCategoria === tab &&
                    prod.activoProd
                  "
                  :key="index + 'prod'"
                  style="border-left: 0.5rem solid #52bb71"
                >
                  <th>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.upc"
                      class="form-control font-weight-bold"
                    />
                  </th>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.nombreProd"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.nombreMarca"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.precioUnit"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.descripcion"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.stockProd"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      @click="removeRegistro(prod)"
                      class="btn btn-outline-danger btn-circle"
                      data-toggle="modal"
                      data-target="#eliminarProducto"
                    >
                      <i class="fas fa-times" aria-hidden="true"></i>
                      <!-- <i class="fa fa-trash" aria-hidden="true"></i> -->
                    </button>
                  </td>
                </tr>
                <tr
                  v-for="(prod, index) in productos"
                  v-show="
                    filtro(index) &&
                    prod.nombreCategoria === tab &&
                    prod.activoProd
                  "
                  :key="index"
                >
                  <th>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.upc"
                      class="form-control font-weight-bold"
                    />
                  </th>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.nombreProd"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.nombreMarca"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.precioUnit"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.descripcion"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      v-autowidth="{ maxWidth: '150px', minWidth: '10px' }"
                      v-model="prod.stockProd"
                      class="form-control"
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      @click="removeRegistro(prod)"
                      class="btn btn-outline-danger btn-circle"
                      data-toggle="modal"
                      data-target="#eliminarProducto"
                    >
                      <!-- <i class="fa fa-trash" aria-hidden="true"></i> -->
                      <i class="fas fa-times" aria-hidden="true"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AgregarProd></AgregarProd>
    </div>
  </div>
</template>

<script>
import AgregarProd from "@/components/Productos/AgregarProd.vue";
import { mapState, mapMutations } from "vuex";

export default {
  name: "Productos",
  components: {
    AgregarProd,
  },
  data: () => {
    return {
      displayOption: "",
      searchDisplay: "",
      urlApi: `http://localhost:8080/categoria`,
      tab: "",
      newProd: [],
    };
  },
  methods: {
    ...mapMutations("productos", ["clearData", "removeRegistro"]),

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
    addProd() {
      var producto = {
        nombreProd: "",
        activoProd: true,
        descripcion: "",
        precioUnit: null,
        stockProd: null,
        upc: null,
        nombreMarca: "",
        nombreCategoria: this.tab,
      };
      this.newProd.push(producto);
    },
    inputBlankOrFilled(cadenaDeTexto) {
      try {
        return cadenaDeTexto.trim().length != 0;
      } catch (error) {
        console.log(error);
        return true;
      }
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
    this.tab = this.categorias[0].nombreCat;

    //this.getAll();
  },
};
</script>
<style scoped>
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #ffffff !important;
  background-color: #e84b63 !important;
}
.nav-tabs .nav-link:hover {
  color: #e10d2d;
  background-color: #f1f1f1;
}
tr:hover input.form-control {
  background-color: #ececec !important;
}
tr input.form-control {
  /* border: thin; */
  height: auto;
}
thead {
  text-align: center;
}
/* .inputDanger {
  border-color: red;
}
.inputSuccess {
  border-color: #28a745;
} */
th input,
td input {
  display: inline-block;
}
.btn-circle {
  width: 2rem;
  height: 2rem;
  padding: 0;
  font-size: 12px;
}
</style>