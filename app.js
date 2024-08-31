const express = require('express');
const app = express();

app.use(express.json());

const clientes = [
  { id: 1, nombre: 'Cliente 1' },
  { id: 2, nombre: 'Cliente 2' },
  { id: 3, nombre: 'Cliente 3' }
];

const productos = [
  { id: 1, nombre: 'Producto 1', precio: 10 },
  { id: 2, nombre: 'Producto 2', precio: 20 },
  { id: 3, nombre: 'Producto 3', precio: 30 }
];




app.get('/clientes', (req, res) => {
  res.json(clientes);
});

app.post('/clientes', (req, res) => {
  const nuevoCliente = {
    id: clientes.length + 1,
    nombre: req.body.nombre
  };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});


app.put('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const cliente = clientes.find(c => c.id === clienteId);
  if (cliente) {
    cliente.nombre = req.body.nombre || cliente.nombre;
    res.json(cliente);
  } else {
    res.status(404).json({ message: 'Cliente no encontrado' });
  }
});


app.delete('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const index = clientes.findIndex(c => c.id === clienteId);
  if (index !== -1) {
    const clienteEliminado = clientes.splice(index, 1);
    res.json(clienteEliminado);
  } else {
    res.status(404).json({ message: 'Cliente no encontrado' });
  }
});




app.get('/productos', (req, res) => {
  res.json(productos);
});


app.post('/productos', (req, res) => {
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});


app.put('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const producto = productos.find(p => p.id === productoId);
  if (producto) {
    producto.nombre = req.body.nombre || producto.nombre;
    producto.precio = req.body.precio || producto.precio;
    res.json(producto);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


app.delete('/productos/:id', (req, res) => {
  const productoId = parseInt(req.params.id);
  const index = productos.findIndex(p => p.id === productoId);
  if (index !== -1) {
    const productoEliminado = productos.splice(index, 1);
    res.json(productoEliminado);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express corriendo en el puerto ${port}`);
});
