<template>
  <div>
    <b-modal id="modalAgregarMar" centered title="Agregar marca">
      <div class="card-body">
        <div class="form-group row">
          <label class="col-md-3 form-control-label">Nombre</label>
          <div class="col-md-9">
            <input
              type="text"
              class="form-control"
              v-model="marca.nombreMarca"
            />
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
              v-model="marca.descripMarca"
            ></textarea>
          </div>
        </div>
      </div>

      <template #modal-footer="{ cancel, ok }">
        <b-button size="m" variant="secondary" @click="cancel()">
          Cancelar
        </b-button>
        <b-button size="m" variant="primary" @click="createRegistro(); ok()"> Guardar </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"

export default {
  name: "AgregarMar",
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations("marcas",["createRegistro"]),
  },
  computed: {
    ...mapState("marcas",["marca"]),
  },
};
</script>
