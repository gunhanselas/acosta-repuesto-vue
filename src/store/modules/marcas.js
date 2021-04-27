import axios from 'axios'
const urlApi = "url/categorias/"

export default {
    namespaced: true,
    state: {
        "marcas": [{
            "idMarca": "0",
            "nombreMarca": "Motul",
            "activoMarca": true,
            "descripMarca": "Generalmente vende productos de mantenimineto de motos",
        },{
            "idMarca": "1",
            "nombreMarca": "BMW",
            "activoMarca": true,
            "descripMarca": "Motos lujosas",
        },
        {
            "idMarca": "2",
            "nombreMarca": "Kawasaki",
            "activoMarca": true,
            "descripMarca": "Fabricadas en plantas en Japón.",
        },{
            "idMarca": "3",
            "nombreMarca": "Ducati",
            "activoMarca": true,
            "descripMarca": "Unas motos cholas que son bien caras",
        }],
        "marca": {
            "idMarca": "0",
            "nombreMarca": "",
            "activoMarca": true,
            "descripMarca": "",
        },
        "marSelected":{}
    },
    mutations: {
        clearData(state) {
            state.marca = {
                idMarca: null,
                nombreMarca: "",
                activoMarca: true,
                descripMarca: "",
            };
        },
        createRegistro: function (state) {
            if (state.marca.nombreMarca.trim() !== "") {
                state.marcas.push(state.marca)
            }
            if (state.marca.nombreMarca.trim() === "cambiar por if de arriba") {
                axios
                    .post(urlApi, JSON.stringify(state.marca), {
                        headers: {
                            "content-type": "application/json",
                        },
                    })
                    .then((response) => {
                        console.log(response.status);
                        this.getAll();
                    })
                    .catch((ex) => {
                        console.log(ex);
                    });
            }
        },
        getMarcaSelected(state, mar) {
            state.marca = mar;
            state.marSelected = JSON.parse(JSON.stringify(mar));
        },
        removeRegistro: function (state) {
            state.marca.activoMarca = false;

            let x = 0;
            if (x === 0) return console.log("");

            axios
                .put(this.urlApi + "/remove/" + this.marca.idMarca)
                .then((response) => {
                    this.getAll();
                    console.log(response.status);
                })
                .catch((ex) => {
                    console.log(ex);
                });
        },
        edithRegistro(state, marSelected) {
            var index = state.marcas.findIndex(element => element.idMarca === marSelected.idMarca);
            state.marcas.splice(index, 1, marSelected);

            let x = 0;
            if (x === 0) return console.log("");

            axios
                .put(this.urlApi, JSON.stringify(this.marca), {
                    headers: {
                        "content-type": "application/json",
                    },
                })
                .then((response) => {
                    this.getAll();
                    console.log(response.status);
                })
                .catch((ex) => {
                    console.log(ex);
                });
        },
    }

}