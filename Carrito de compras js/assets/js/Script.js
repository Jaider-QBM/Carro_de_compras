const carrito = [];
            const carritoModal = document.getElementById("carritoModal");
    
            document.addEventListener("click", function (e) {
                if (e.target && e.target.classList.contains("agregar-producto")) {
                    const id = e.target.getAttribute("data-id");
                    const nombre = e.target.getAttribute("data-nombre");
                    const precio = parseFloat(e.target.getAttribute("data-precio"));
                    agregarProducto(id, nombre, precio);
                }
            });
    
            function agregarProducto(id, nombre, precio) {
                const productoExistente = carrito.find(item => item.id === id);
    
                if (productoExistente) {
                    productoExistente.cantidad++;
                } else {
                    carrito.push({ id, nombre, precio, cantidad: 1 });
                }
    
                mostrarCarrito();
            }
    
            function mostrarCarrito() {
                const listaCarrito = document.getElementById("lista-carrito");
                const total = document.getElementById("total");
                listaCarrito.innerHTML = "";
                let totalPrecio = 0;
    
                carrito.forEach(producto => {
                    const { id, nombre, precio, cantidad } = producto;
                    const itemCarrito = document.createElement("li");
                    itemCarrito.innerHTML = `
                        ${nombre} - $${precio.toFixed(2)} x ${cantidad}
                        <button class="editar-cantidad" data-id="${id}">Editar</button>
                        <button class="eliminar-producto" data-id="${id}">Eliminar</button>
                    `;
                    listaCarrito.appendChild(itemCarrito);
    
                    totalPrecio += precio * cantidad;
                });
    
                total.textContent = totalPrecio.toFixed(2);
    
                // Mostrar el modal del carrito
                carritoModal.style.display = "block";
            }
    
            function cerrarCarrito() {
                // Cerrar el modal del carrito
                carritoModal.style.display = "none";
            }
    
            document.addEventListener("click", function (e) {
                if (e.target && e.target.classList.contains("editar-cantidad")) {
                    const id = e.target.getAttribute("data-id");
                    editarCantidad(id);
                }
    
                if (e.target && e.target.classList.contains("eliminar-producto")) {
                    const id = e.target.getAttribute("data-id");
                    eliminarProducto(id);
                }
            });
    
            function editarCantidad(id) {
                const nuevaCantidad = prompt("Ingrese la nueva cantidad:");
                if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
                    const producto = carrito.find(item => item.id === id);
                    if (producto) {
                        producto.cantidad = parseInt(nuevaCantidad);
                        mostrarCarrito();
                    }
                } else {
                    alert("Por favor, ingrese una cantidad válida.");
                }
            }
    
            function eliminarProducto(id) {
                const index = carrito.findIndex(item => item.id === id);
                if (index !== -1) {
                    carrito.splice(index, 1);
                    mostrarCarrito();
                }
            }