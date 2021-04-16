var vm = new Vue({
    el: "#domVue",
    data: {
        productos: [{
            idMarca: 0,
            nombreProd: "20W50",
            activoProd: true,
            descripcion: "Lubricante para motos",
            idCategoria: 3,
            precioUnit: 5,
            stockProd: 100,
            upc: 53260,
            nombreMarca: "Motul",
            nombreCategoria: "Lubricantes"
        },{
            idMarca: 1,
            nombreProd: "System 7 Blanco",
            activoProd: true,
            descripcion: "Carcasa completa de carbono",
            idCategoria: 1,
            precioUnit: 57.99,
            stockProd: 16,
            upc: 37842,
            nombreMarca: "BMW",
            nombreCategoria: "Cascos"
        }],
        producto: {
            idMarca: null,
            nombreProd: "",
            activoProd: true,
            descripcion: "",
            idCategoria: null,
            precioUnit: null,
            stockProd: null,
            upc: null,
            nombreMarca: "",
            nombreCategoria: ""
        },
        displayOption: "",
        searchDisplay: "",
        urlApi: `${ApiRestUrl}producto`,
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
        }],
        add: {}
    },
    methods: {

        /*
        Modifica el registro seleccionado
        */
        edithRegistro() {
            this.producto.idMarca = this.marcas.filter(mar => mar.nombreMarca === this.producto.nombreMarca)[0].idMarca;
            this.producto.idCategoria = this.categorias.filter(cat => cat.nombreCat === this.producto.nombreCategoria)[0].idCategoria;
            if (this.producto.upc.trim() !== "" && this.producto.stockProd > 0 && this.producto.nombreProd.trim() !== "" && this.producto.idMarca > 0 && this.producto.idCategoria > 0) {
                console.log(this.producto);
                axios.put(this.urlApi, JSON.stringify(this.producto), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                console.log("No se pudo editar el producto porque uno de los valores es nulo, indefinido o está vacio");
            }
        },
        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            this.producto.idMarca = this.marcas.filter(mar => mar.nombreMarca === this.producto.nombreMarca)[0].idMarca;
            this.producto.idCategoria = this.categorias.filter(cat => cat.nombreCat === this.producto.nombreCategoria)[0].idCategoria;
            if (this.producto.upc.trim() !== "" && this.producto.stockProd > 0 && this.producto.nombreProd.trim() !== "" && this.producto.idMarca > 0 && this.producto.idCategoria > 0) {
                console.log(this.producto);
                axios.post(this.urlApi, JSON.stringify(this.producto), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    console.log(response.status);
                    this.getAll();
                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                console.log("No se pudo registrar el producto porque uno de los valores es nulo, indefinido o está vacio");
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            axios.put(this.urlApi + "/remove/" + this.producto.upc).then(
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
                    this.productos = response.data
                    this.productos = this.productos.filter(prod => prod.activoProd === true);
                    this.productos.map(prod => {
                        prod.nombreCategoria = this.categorias.filter(cat => cat.idCategoria === prod.idCategoria)[0].nombreCat;
                        prod.nombreMarca = this.marcas.filter(mar => mar.idMarca === prod.idMarca)[0].nombreMarca;
                    });

                }
            ).catch(ex => {
                console.log(ex)
            })
        },

        /*
        limpiando valores de la marca previamente seleccionada
         */
        clearData() {
            this.producto = {
                idMarca: null,
                nombreProd: "",
                activoProd: true,
                descripcion: "",
                idCategoria: null,
                precioUnit: null,
                stockProd: null,
                upc: null,
                nombreMarca: "",
                nombreCategoria: ""
            }
        },
        getProductoSelected(prod) {
            this.producto = prod;
            // this.producto.idMarca = this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca;
            // console.log(this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca);
            // var idMar = typeof this.marcas !== 'undefined'?this.marcas.filter(mar => mar.idMarca === this.producto.idMarca)[0].nombreMarca:'';
            // this.producto.idMarca = idMar;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.marcas.filter(mar => mar.idMarca === this.productos[valor].idMarca)[0].nombreMarca + this.categorias.filter(cat => cat.idCategoria === this.productos[valor].idCategoria)[0].nombreCat + this.productos[valor].nombreProd + this.productos[valor].descripcion + this.productos[valor].precioUnit + this.productos[valor].stockProd + this.productos[valor].upc).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
        showEditing: function (input) {
            // Get the value from the input
            var value = input.value;
            // Get the matching `option` element from the `datalist` (which is
            // available via `input.list`)
            var option = Array.prototype.find.call(input.list.options, function (option) {
                return option.value === value;
            });
            // Get its `data-id` attribute value
            console.log(option.getAttribute("data-id"));
        }
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        // Obtener las categorias


        return;


        axios.get(ApiRestUrl + "categoria").then(
            response => {
                this.categorias = response.data;
                console.log(response.status);
                // Obtener las marcas
                axios.get(ApiRestUrl + "marca").then(
                    response => {
                        this.marcas = response.data;
                        console.log(response.status);
                        this.getAll();
                    }
                ).catch(ex => {
                    console.log(ex)
                })
            }
        ).catch(ex => {
            console.log(ex)
        })

    },
});