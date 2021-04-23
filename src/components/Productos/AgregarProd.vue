<template>
  <b-modal id="modalAddProd" centered title="Agregar Producto">
    <div class="card-body">
      <div class="form-group row">
        <label class="col-md-3 form-control-label">UPC</label>
        <div class="col-md-9">
          <input type="text" class="form-control" v-model="producto.upc" />
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Nombre</label>
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            v-model="producto.nombreProd"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Marca</label>
        <div class="col-md-9">
          <input
            list="marcas"
            name="marca"
            id="marca"
            class="form-control"
            v-model="producto.nombreMarca"
          />
          <datalist id="marcas">
            <option v-for="(mar, index) in marcas" :data-value="mar.idMarca" :key="index">
              {{ mar.nombreMarca }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Categoria</label>
        <div class="col-md-9">
          <input
            list="categoria"
            name="cat"
            id="cat"
            class="form-control"
            v-model="producto.nombreCategoria"
          />
          <datalist id="categoria">
            <option v-for="(cat, index) in categorias" :key="index">
              {{ cat.nombreCat }}
            </option>
          </datalist>
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Precio</label>
        <div class="col-md-9">
          <div class="form-group">
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <span class="input-group-text">$</span>
              </div>
              <input
                type="text"
                aria-label="Dollar amount (with dot and two decimal places)"
                class="form-control"
                v-model="producto.precioUnit"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Descripción</label>
        <div class="col-md-9">
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            v-model="producto.descripcion"
          ></textarea>
        </div>
      </div>
      <div class="line"></div>
      <div class="form-group row">
        <label class="col-md-3 form-control-label">Stock</label>
        <div class="col-md-9">
          <input
            type="text"
            class="form-control"
            v-model="producto.stockProd"
          />
        </div>
      </div>
    </div>

    <template #modal-footer="{ cancel, ok }">
      <b-button size="m" variant="secondary" @click="cancel()">
        Cancelar
      </b-button>
      <b-button
        size="m"
        variant="primary"
        @click="
          createRegistro();
          ok();
        "
      >
        Guardar
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "AgregarProd",
  data() {
    return {
        "marcas":[{"nombreMarca":"esta es una cat"}]
    };
  },
  methods: {
    ...mapMutations("categorias", ["createRegistro"]),
  },
  computed: {
    ...mapState("productos", ["producto"]),
    ...mapState("categorias", ["categorias"]),
  },
};
</script>
