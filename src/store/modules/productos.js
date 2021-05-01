import axios from 'axios'
const urlApi = "url/productos/"

export default {
    namespaced: true,
    state: {
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
            }, {
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
            },
            {
                idMarca: 2,
                nombreProd: "22 pulgadas",
                activoProd: true,
                descripcion: "Llantas para motos",
                idCategoria: 3,
                precioUnit: 24.50,
                stockProd: 7,
                upc: 23471,
                nombreMarca: "Dunlop",
                nombreCategoria: "Llantas"
            }
        ],
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
        marcas: [{
                idMarca: "0",
                nombreMarca: "Motul",
                activoMarca: true,
                descripMarca: "Generalmente vende productos de mantenimineto de motos",
            }, {
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
            }, {
                idMarca: "3",
                nombreMarca: "Ducati",
                activoMarca: true,
                descripMarca: "Unas motos cholas que son bien caras",
            }
        ],
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
            }, {
                idCategoria: "2",
                nombreCat: "Luces Led",
                activoCat: true,
                descripcion: "Todas las luces led",
            }
        ],
        add: {}
    },
    mutations: {
        /*
                Modifica el registro seleccionado
                */
        edithRegistro() {
            this.producto.idMarca = this.marcas.filter(mar => mar.nombreMarca === this.producto.nombreMarca)[0].idMarca;
            this.producto.idCategoria = this.categorias.filter(cat => cat.nombreCat === this.producto.nombreCategoria)[0].idCategoria;
            if (this.producto.upc.trim() !== "" && this.producto.stockProd > 0 && this.producto.nombreProd.trim() !== "" && this.producto.idMarca > 0 && this.producto.idCategoria > 0) {
                console.log(this.producto);
                axios.put(urlApi, JSON.stringify(this.producto), {
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
                axios.post(urlApi, JSON.stringify(this.producto), {
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
        removeRegistro: function (state,producto) {
            producto.activoProd = false;
            // this.clearData();
            let x = 0;
            if (x === 0) return console.log("");

            axios.put(urlApi + "/remove/" + this.producto.upc).then(
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
            axios.get(urlApi).then(
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
        clearData: function () {
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
    }
}