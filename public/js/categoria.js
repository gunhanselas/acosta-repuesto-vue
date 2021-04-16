var vm = new Vue({
    el: "#domVue",
    data: {
        categorias: [{
            idCategoria: "0",
            nombreCat: "Llantas",
            activoCat: true,
            descripcion: "Aqui estan todas las llantas",
        },
        {
            idCategoria: "1",
            nombreCat: "Cascos",
            activoCat: true,
            descripcion: "Se listan todos los cascos",
        },{
            idCategoria: "2",
            nombreCat: "Luces Led",
            activoCat: true,
            descripcion: "Todas las luces led",
        },{
            idCategoria: "3",
            nombreCat: "Lubricantes",
            activoCat: true,
            descripcion: "Para todo tipos de motor",
        }],
        categoria: {
            idCategoria: "0",
            nombreCat: "",
            activoCat: true,
            descripcion: "",
        },
        displayOption: "",
        searchDisplay: "",
        urlApi: `${ApiRestUrl}categoria`,
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */
        edithRegistro() {
            axios.put(this.urlApi, JSON.stringify(this.categoria), {
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
            if (this.categoria.nombreCat.trim() !== "") {
                axios.post(`${this.urlApi}`, JSON.stringify(this.categoria), {
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

            
            this.categoria.activoCat=false;
            return;


            axios.put(this.urlApi+"/remove/"+this.categoria.idCategoria).then(
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
                    this.categorias = response.data
                    this.categorias = this.categorias.filter(cat => cat.activoCat === true);
                }
            ).catch(ex => {
                console.log(ex)
            })
        },

        /*
        limpiando valores de la categoria previamente seleccionada
         */
        clearData() {
            this.categoria = {
                idCategoria: null,
                nombreCat: "",
                activoCat: true,
                descripcion: "",
            }
        },
        addMode() {
            this.clearData();
            this.displayOption = "Agregue una nueva Categoria";
        },
        getCategoriaSelected(cat) {
            this.categoria = cat;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.categorias[valor].idCategoria + this.categorias[valor].nombreCat + this.categorias[valor].descripcion).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        //this.getAll();
    },
});