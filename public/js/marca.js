var vm = new Vue({
    el: "#domVue",
    data: {
        marcas: [{
            idMarca: "0",
            nombreMarca: "Motul",
            activoMarca: true,
            descripMarca: "Generalmente vende productos de mantenimineto de motos",
        },{
            idMarca: "1",
            nombreMarca: "BMW",
            activoMarca: true,
            descripMarca: "Motos lujosas",
        },
        {
            idMarca: "2",
            nombreMarca: "Kawasaki",
            activoMarca: true,
            descripMarca: "Fabricadas en plantas en Japón.",
        },{
            idMarca: "3",
            nombreMarca: "Ducati",
            activoMarca: true,
            descripMarca: "Unas motos cholas que son bien caras",
        }],
        marca: {
            idMarca: "0",
            nombreMarca: "",
            activoMarca: true,
            descripMarca: "",
        },
        displayOption: "",
        searchDisplay: "",
        urlApi: `${ApiRestUrl}marca`,
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */
        edithRegistro() {
            axios.put(this.urlApi, JSON.stringify(this.marca), {
                headers: {
                    'content-type': 'application/json'
                }
            }).then(
                response => {
                    this.getAll();
                    console.log(response.status);
                }
            ).catch(ex => {
                console.log(ex)
            })

        },
        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            if (this.marca.nombreMarca.trim() !== "") {
                console.log(this.marca);
                axios.post(this.urlApi, JSON.stringify(this.marca), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            this.displayOption = 'eliminar';
            axios.put(this.urlApi + "/remove/" + this.marca.idMarca).then(
                response => {
                    this.getAll();
                    console.log(response.status)
                }
            ).catch(ex => {
                console.log(ex)
            });

        },

        /*
        recolecta todos los datos al hacer una peticion al api
         */
        getAll() {
            axios.get(this.urlApi).then(
                response => {
                    this.marcas = response.data
                    this.marcas = this.marcas.filter(mar => mar.activoMarca === true);
                }
            ).catch(ex => {
                console.log(ex)
            })
        },

        /*
        limpiando valores de la marca previamente seleccionada
         */
        clearData() {
            this.marca = {
                idMarca: null,
                nombreMarca: "",
                activoMarca: true,
                descripcionMarca: "",
            }
        },
        getMarcaSelected(mar) {
            this.marca = mar;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.marcas[valor].nombreMarca + this.marcas[valor].descripMarca).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        return;
        this.getAll();
    },
});