<template>
    <div class="page-holder w-100 d-flex flex-wrap">
        <div class="container-fluid px-xl-5">
            <div style="margin-top: 2rem;">
                <div class="card">
                    <div class="card-header">
                        <h6 class="text-uppercase mb-0" style="display: inline-block;">
                        Marcasiñas
                        </h6>
                        <b-button
                            v-b-modal.modalAgregarMar
                            variant="success"
                            v-on:click="clearData()"
                        >
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        </b-button> 
                    </div>
                    <div class="card-body">
                        <div class="form-group position-relative mb-0">
                            <button 
                            type="submit" 
                            style="top: -3px; left: 0;"
                            class="position-absolute bg-white border-0 p-0">
                            <i class="o-search-magnify-1 text-gray text-lg"></i>
                            </button>
                            <input 
                            type="search" 
                            v-model="searchDisplay" 
                            placeholder="Buscar marca..."
                            class="form-control form-control-sm border-0 no-shadow pl-4">
                        </div>
                        <table class="table card-text table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Descripción</th>
                                    <th>Operaciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr 
                                    v-for="(mar,index) in marcas" 
                                    v-show="filtro(index) && mar.activoMarca == true"
                                    :key="index"
                                >
                                <th scope="row">{{index+1}}</th>
                                <td>{{mar.nombreMarca}}</td>
                                <td>{{mar.descripMarca}}</td>
                                <td>
                                <b-button
                                    v-b-modal.modal-deleteMar
                                    variant="danger"
                                    v-on:click="getMarcaSelected(mar)"
                                >
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                </b-button>
                                <b-button
                                    v-b-modal.modal-editMar
                                    variant="warning"
                                    v-on:click="getMarcaSelected(mar)"
                                >
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                </b-button>
                                </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AgregarMar></AgregarMar>
            <DeleteMar></DeleteMar>
            <EditMar></EditMar>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import AgregarMar from "@/components/Marcas/AgregarMar.vue";
import DeleteMar from "@/components/Marcas/DeleteMar.vue";
import EditMar from "@/components/Marcas/EditMar.vue";
import { mapState, mapMutations } from "vuex";

export default {
    name: "Marcas",
    components: {
        AgregarMar,
        DeleteMar,
        EditMar,
    },
    data: () => {
        return {
        displayOption: "",
        searchDisplay: "",
        urlApi: `http://localhost:8080/marcas`,
        };
    },
    methods: {
        ...mapMutations("marcas",["clearData","getMarcaSelected"]),
        /**
         * Recolecta todos los datos al hacer una peticion
         */
        getAll(){
            axios.get(this.urlApi)
                .then((response) =>{
                    this.marcas = response.data;
                    this.marcas = this.marcas.filter(
                        (mar) => mar.activoMar === true
                    );
                })
                .catch((ex)=>{
                    console.log(ex);
                });
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
                let array = (
                this.marcas[valor].nombreMar + this.marcas[valor].descripcion
            ).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
    },
    computed:{
      ...mapState("marcas", ["marcas", "marca"]),
    },
    /*
        hook para inicializar los valores de la tabla
     */
        mounted() {
    //this.getAll();
    },
    
}
</script>
