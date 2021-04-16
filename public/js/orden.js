var vm = new Vue({
    el: "#domVue",
    data: {
        ordenes: [{
            "nombrePago": "Tarjeta de débito",
            "idOrden":1,
            "fechaOrd":"25/Enero/2021",
            "idMetodoPago": 0,
            "nombreCliente": "Cristian Ayala",
            "observacionesOrden": "No tiene moto pero viene a comprar",
            "totalOrden": 45.99,
            "productos": [{
                idMarca: 0,
                nombreProd: "20W50",
                activoProd: true,
                descripcion: "Lubricante para motos",
                idCategoria: 3,
                precioUnit: 5,
                stockProd: 100,
                upc: 53260,
                nombreMarca: "Motul",
                nombreCategoria: "Lubricantes",
                cantidad:3,
                descuento: 0
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
                nombreCategoria: "Cascos",
                cantidad:5,
                descuento: 50
            }]
        }],
        orden: {
            "idMetodoPago": 0,
            "nombreCliente": "",
            "observacionesOrden": "",
            "totalOrden": 0
        },
        searchDisplay: "",
        urlApi: `${ApiRestUrl}orden`,
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
        ordSelected: {},
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
            nombreCategoria: "Lubricantes",
            cantidad:0,
            descuento: 0
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
            nombreCategoria: "Cascos",
            cantidad:0,
            descuento: 0
        }],
        metPago: [{
            nombrePago: "Tarjeta de Crédito",
            idMetodoPago:0
        },
        {
            nombrePago: "Tarjeta de Débito",
            idMetodoPago:1
        },{
            nombrePago: "Efectivo",
            idMetodoPago:2
        }],
        metPagoSelected: "",
        detalleOrden: [],
        activaOrd: [],
        prodSearch: "",
        // Esto va a servir para construir objetos ordenes
        productosObject: [],
        i: 0,
        j: 0,
    },
    methods: {
        /*
        creacion de nuevos registros
        (no se pueden crear registros vacios)
         */
        createRegistro: function () {
            //minizar el paquete de enviada de los productos
            this.detalleOrden = this.productos.map(obj => {
                let objet = {
                    "precioUnit": obj.precioUnit,
                    "upc": obj.upc,
                    "cantidadProd": obj.cantidad,
                    "descuento": obj.descuento,
                    "stockProd": obj.stockProd
                };
                return objet;
            });
            this.detalleOrden = this.detalleOrden.filter(obj => obj.cantidadProd > 0);
            //Creando objeto para orden
            this.orden.idMetodoPago = this.metPago.filter(metPag => metPag.nombrePago === this.metPagoSelected)[0].idMetodoPago;
            if (this.orden.nombreCliente.trim() !== "" && this.orden.totalOrden > 0 && this.orden.idMetodoPago >= 0) {
                axios.post(this.urlApi, JSON.stringify(this.orden), {
                    headers: {
                        'content-type': 'application/json'
                    }
                }).then(response => {
                    let ordenId = response.data;
                    console.log("orden es", ordenId)
                    console.log("Estos son los productos", this.detalleOrden)
                    //sólo productos seleccionados
                    this.detalleOrden.map(prod => {
                        console.log("Cantidad", prod.cantidadProd)
                        if (prod.cantidadProd > 0) {
                            prod.idOrden = ordenId;
                            console.log("Producto con idOrden", prod)
                            console.log("Esto envié: ", JSON.stringify(prod));
                            axios.post(ApiRestUrl + "detalleOrden", JSON.stringify(prod), {
                                headers: {
                                    'content-type': 'application/json'
                                }
                            }).then(response => {
                                console.log("se supone que ya estoy .-.")
                                //reiniciar todo
                                // this.getAll();
                                // this.getProductos();
                                // this.clearData();
                                let stockNew = {
                                    stockProd: prod.stockProd - prod.cantidadProd
                                };
                                //Modifcar el stock de cada producto
                                axios.put(ApiRestUrl + "producto/stock/" + prod.upc, JSON.stringify(stockNew), {
                                    headers: {
                                        'content-type': 'application/json'
                                    }
                                }).then(
                                    response => {
                                        this.metPago = response.data;
                                        location.reload();
                                    }
                                ).catch(ex => {
                                    console.log(ex)
                                });
                            }).catch(ex => {

                                console.log(ex);

                            })
                        }
                    });

                }).catch(ex => {
                    console.log(ex)
                });
            } else {
                console.log("No se pudo registrar la orden porque uno de los valores es nulo, indefinido o está vacio");
            }

        },

        /*
        eliman registros, correspondiente al id seleccionado
         */
        removeRegistro: function () {
            axios.put(this.urlApi + "/remove/" + this.ordSelected.idOrden).then(
                response => {
                    localStorage.setItem("orden-eliminada", this.ordSelected.idOrden);
                    location.reload();
                    console.log(response.status)
                }
            ).catch(ex => {
                console.log(ex)
            });

        },
        //Obtener productos
        getProductos: function () {
            axios.get(ApiRestUrl + "producto").then(
                response => {
                    this.productos = response.data.map((obj, index) => {
                        let object = {
                            "activoProd": obj.activoProd,
                            "descripcion": obj.descripcion,
                            "idCategoria": obj.idCategoria,
                            "idMarca": obj.idMarca,
                            "nombreProd": obj.nombreProd,
                            "precioUnit": obj.precioUnit,
                            "stockProd": obj.stockProd,
                            "upc": obj.upc,
                            "cantidad": null,
                            "descuento": 0
                        };
                        return object;
                    });
                    //Filtrar productos activos solamentes
                    this.productos = this.productos.filter(prod => {
                         if (prod.activoProd) {
                            return prod;

                         }
                    });
                }
            ).catch(ex => {
                console.log(ex)
            })
        },

        /*
        recolecta todos los datos al hacer una peticion al api
         */
        getAll: async function () {
            await axios.get(ApiRestUrl + "detalleOrden").then(
                response => {
                    this.ordenes = response.data
                    this.ordenes.map(detOrd => {
                        this.activaOrd.map(ordenActiva => {
                            if (ordenActiva === detOrd.orden.idOrden) {
                                try {
                                    if (typeof this.ordenes[this.i].idOrden != 'undefined') {
                                        if (this.ordenes[this.i].idOrden !== detOrd.orden.idOrden) {
                                            this.i++;
                                            this.j = 0;
                                            this.productosObject = [];
                                        }
                                    }
                                } catch (err) {}
                                this.ordenes[this.i] = detOrd.orden;
                                this.productosObject.push(detOrd.producto);
                                this.ordenes[this.i].productos = this.productosObject;
                                this.ordenes[this.i].productos[this.j].descuento = detOrd.descuento;
                                this.ordenes[this.i].productos[this.j].cantidadProd = detOrd.cantidadProd;
                                this.ordenes[this.i].productos[this.j].precioUnit = detOrd.precioUnit;
                                this.ordenes[this.i].nombrePago = this.ordenes[this.i].idMetodoPago.nombrePago;
                                try {
                                    //para quitar [UTC] al final de la fecha
                                    let myDate = new Date(this.ordenes[this.i].fechaOrd.slice(0, this.ordenes[this.i].fechaOrd.length - 5));
                                    this.ordenes[this.i].fechaOrd = this.formatDate(myDate);
                                    this.ordenes[this.i].totalOrden = this.ordenes[this.i].totalOrden.toFixed(2);
                                } catch (error) {}
                                this.j++;
                            }
                        });
                    });

                }
            ).catch(ex => {
                console.log(ex)
            })
            //Quita los que no son ordenes sino detallesOrdenes
            this.ordenes = this.ordenes.slice(0, this.i + 1);
        },
        restartObject: function () {
            console.log("Me llamaron?")
            this.i++;
            this.j = 0;
            this.productosObject = [];
        },

        formatDate: function (date) {
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var ampm = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            minutes = minutes < 10 ? '0' + minutes : minutes;
            var strTime = hours + ':' + minutes + ' ' + ampm;
            return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + " " + strTime;
        },

        /*
        limpiando valores de la marca previamente seleccionada
         */
        clearData() {
            this.i = 0;
            this.j = 0;
            this.metPagoSelected = "";
            this.ordSelected = {};
            this.productosObject = [];
            this.orden = {
                "idMetodoPago": 0,
                "nombreCliente": "",
                "observacionesOrden": "",
                "totalOrden": 0
            }
        },
        getProductoSelected(prod) {
            this.producto = prod;
        },
        filtro(valor) {
            if (this.searchDisplay === "") return true;
            let array = (this.ordenes[valor].idOrden + this.ordenes[valor].observacionesOrden + this.ordenes[valor].totalOrden + this.ordenes[valor].nombreCliente).toUpperCase();
            return array.indexOf(this.searchDisplay.toUpperCase()) >= 0;
        },
        filtroProd(valor) {
            if (this.prodSearch === "") return true;
            let array = (this.marcas.filter(mar => mar.idMarca === this.productos[valor].idMarca)[0].nombreMarca + this.categorias.filter(cat => cat.idCategoria === this.productos[valor].idCategoria)[0].nombreCat + this.productos[valor].nombreProd + this.productos[valor].descripcion + this.productos[valor].precioUnit + this.productos[valor].stockProd + this.productos[valor].upc).toUpperCase();
            return array.indexOf(this.prodSearch.toUpperCase()) >= 0;
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
        },
        doubleClick: function () {
            const btndetOrd = document.getElementById("btnDetOrden");
            btndetOrd.click()
        },
        converterIdCat2CatName: function (idCat) {
            //return this.categorias.filter(cat => cat.idCategoria === idCat)[0].nombreCat;
        },
        converterIdMar2MarName: function (idMarca) {
            // return this.marcas.filter(mar => mar.idMarca === idMarca)[0].nombreMarca;
        },
        converterIdMetPago2MetName: function (idMetodoPago) {
            return this.metPago.filter(met => met.idMetodoPago === idMetodoPago)[0].nombrePago;
        },
        enforceMinMax(produ) {
            console.log("key up event, cant: ", produ.cantidad, " stock: ", produ.stockProd)
            if (parseInt(produ.cantidad) < 0) {
                produ.cantidad = 0;
            }
            if (produ.cantidad > produ.stockProd) {
                console.log("Es mayor")
                produ.cantidad = produ.stockProd;
            }
        },
        change(prod, e) {
            let item = e.target.value.replace(/[^\d]/g, '');
            if (item < prod.stockProd) {
                e.target.value = item;
            } else {
                e.target.value = prod.stockProd;
            }
        },
        //decrementar cantidad del producto a valores no negativos
        decProducto(produ) {
            if (produ.cantidad > 1) {
                produ.cantidad--;
            } else {
                produ.cantidad = null;
            }
            // produ.subtotal = this.subtotal(produ.cantidad, produ.precio);
        },
        //incrementar cantidad del producto 
        incProducto(produ) {        
            if (parseInt(produ.cantidad) >= parseInt(produ.stockProd)) {
                produ.cantidad = produ.stockProd - 1;
            }
            produ.cantidad++;
            // produ.subtotal = this.subtotal(produ.cantidad, produ.precio);
        },
        calcularTotal() {
            this.orden.totalOrden = 0;
            this.productos.forEach(prod => {
                this.orden.totalOrden += ((prod.precioUnit * prod.cantidad) - (prod.precioUnit * prod.cantidad * (prod.descuento / 100)));
            });
        },
        primerosDigitos(idOrden) {
            try {
                return idOrden.substring(0, 5);
            } catch (error) {
                return idOrden;
            }
        },
        dosDecimalesProd(precio) {
            try {
                return precio.toFixed(2);
            } catch (error) {
                return precio;
            }
        }
    },
    /*
    hook para inicializar los valores de la tabla
     */
    mounted() {
        return;
        //Obtiene id De las ordenes activas
        axios.get(ApiRestUrl + "orden/soloActivos").then(
            response => {
                this.activaOrd = response.data;
                this.getAll();
            }
        ).catch(ex => {
            console.log(ex)
        });
        // Obtener las categorias
        axios.get(ApiRestUrl + "categoria").then(
            response => {
                this.categorias = response.data;
                // Obtener las marcas
                axios.get(ApiRestUrl + "marca").then(
                    response => {
                        this.marcas = response.data;
                        this.getProductos();
                    }
                ).catch(ex => {
                    console.log(ex)
                })
            }
        ).catch(ex => {
            console.log(ex)
        })
        //Get Metodos pagos
        axios.get(ApiRestUrl + "metodoPago").then(
            response => {
                this.metPago = response.data;
            }
        ).catch(ex => {
            console.log(ex)
        });
    },
    watch: {
        //actualiza el array de productos detalle orden
        productos: {
            // Permite detectar cambios dentro del array
            deep: true,
            // Se filtra al detalle orden solo los productos con cantidades positivas
            handler() {
                this.calcularTotal();
            }
        }
    }
});