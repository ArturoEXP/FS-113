import { useState } from 'react'
import './App.css'

function App() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProduct = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products/21");
    const data = await res.json();
    setProduct(data);
    setLoading(false);
  }

  const createProduct = async () => {
    setLoading(true);
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify({
        title: "Espada Láser",
        price: 499.99,
        description: "Una espada láser super bonita, brillante y roja.",
        image: "https://disfracesbacanal.com/32048-large_default/espada-laser-galactico.jpg",
        category: "Star Wars"
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const data = await res.json();
    console.log("Producto creado:", data);
    setProduct(data);
    setLoading(false);
  }

  const updateProduct = async () => {
    if (!product) return alert("Primero crea u obtén un producto.");
    setLoading(true);
    const updatedProduct = {
        ...product,
        title: "Espada Láser PRO",
        price: 599.99
      };        
      const res = await fetch(`https://fakestoreapi.com/products/${product.id}`, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
            "Content-Type": "application/json"
        }
        });
        const data = await res.json();
        console.log("Producto actualizado:", data);
        setProduct(data);
        setLoading(false);
  }

  const deleteProduct = async () => {
    if(!product) return alert("No hay producto para eliminar.");
    setLoading(true);
    await fetch(`https://fakestoreapi.com/products/${product.id}`)
    console.log("Producto eliminado");
    setProduct(null);
    setLoading(false);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>🛍️ CRUD con FakeStoreAPI</h1>
            <button onClick={getProduct}>🔍 Obtener producto</button>{" "}
            <button onClick={createProduct}>➕ Crear producto</button>{" "}
            <button onClick={updateProduct}>✏️ Editar producto</button>{" "}
            <button onClick={deleteProduct}>🗑️ Eliminar producto</button>

            {loading && <p>Cargando...</p>}

            {product && (
                <div style={{ marginTop: "2rem", border: "1px solid #ccc", padding: "1rem" }}>
                    <h2>{product.title}</h2>
                    <img src={product.image} alt="Producto" width="150" />
                    <p><strong>Precio:</strong> ${product.price}</p>
                    <p><strong>Descripción:</strong> {product.description}</p>
                    <p><strong>Categoría:</strong> {product.category}</p>
                </div>
            )}
        </div>
  )
}

export default App
