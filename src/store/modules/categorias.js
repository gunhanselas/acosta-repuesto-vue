import axios from 'axios'
const urlApi = "url/categorias/"

export default {
    namespaced: true,
    state: {
        "categorias": [{
                "idCategoria": "0",
                "nombreCat": "Llantas",
                "activoCat": true,
                "descripcion": "Aqui estan todas las llantas",
            },
            {
                "idCategoria": "1",
                "nombreCat": "Cascos",
                "activoCat": true,
                "descripcion": "Se listan todos los cascos",
            },
            {
                "idCategoria": "2",
                "nombreCat": "Luces Led",
                "activoCat": true,
                "descripcion": "Todas las luces led",
            },
            {
                "idCategoria": "3",
                "nombreCat": "Lubricantes",
                "activoCat": true,
                "descripcion": "Para todo tipos de motor",
            },
        ],
        "categoria": {
            "idCategoria": "0",
            "nombreCat": "",
            "activoCat": true,
            "descripcion": "",
        },
        "catSelected": {}
    },
    mutations: {
        /**
         * limpiando valores de la categoria previamente seleccionada
         * @param {*} state 
         */
        clearData(state) {
            state.categoria = {
                idCategoria: null,
                nombreCat: "",
                activoCat: true,
                descripcion: "",
            };
        },
        /**
         * Crea registro con categoria
         * El nombre no tiene que ir vacío
         * @param {*} state 
         */
        createRegistro: function (state) {
            if (state.categoria.nombreCat.trim() !== "") {
                state.categorias.push(state.categoria)
            }
            if (state.categoria.nombreCat.trim() === "cambiar por if de arriba") {
                axios
                    .post(urlApi, JSON.stringify(state.categoria), {
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
        /**
         * 
         * @param {*} cat 
         */
        getCategoriaSelected(state, cat) {
            state.categoria = cat;
            state.catSelected = JSON.parse(JSON.stringify(cat));
        },
        /**
         * Elimina un registro
         * @returns nada we :v,¿esperabas algo?
         */
        removeRegistro: function (state) {
            state.categoria.activoCat = false;

            let x = 0;
            if (x === 0) return console.log("");

            axios
                .put(this.urlApi + "/remove/" + this.categoria.idCategoria)
                .then((response) => {
                    this.getAll();
                    console.log(response.status);
                })
                .catch((ex) => {
                    console.log(ex);
                });
        },
        edithRegistro(state, catSelected) {
            var index = state.categorias.findIndex(element => element.idCategoria === catSelected.idCategoria);
            state.categorias.splice(index, 1, catSelected);

            let x = 0;
            if (x === 0) return console.log("");

            axios
                .put(this.urlApi, JSON.stringify(this.categoria), {
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