import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  if (!user || user.role !== 'admin') {
    return <p>No tienes permiso para ver esta página.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToAdd = {
      ...newProduct,
      id: Date.now(), 
      price: parseFloat(newProduct.price)
    };

    setProducts(prev => [...prev, productToAdd]);
    setNewProduct({
      title: '',
      description: '',
      price: '',
      image: '',
      category: ''
    });
    setShowForm(false);
    alert('Producto agregado exitosamente');
  };

  return (
    <div className="container mt-4">
      <h2>Panel de Administrador</h2>
      
      <button 
        className="btn btn-primary mb-3"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Cancelar' : 'Agregar Producto'}
      </button>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            <h3>Nuevo Producto</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Título:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={newProduct.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Precio:</label>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Categoría:</label>
                <select
                  className="form-control"
                  name="category"
                  value={newProduct.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="k-pop">K-pop</option>
                  <option value="anime">Anime</option>
                  <option value="merchandise">Merchandise</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Imagen:</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                />
                {newProduct.image && (
                  <img 
                    src={newProduct.image} 
                    alt="Preview" 
                    className="mt-2"
                    style={{ maxWidth: '200px' }}
                  />
                )}
              </div>

              <button type="submit" className="btn btn-success">
                Guardar Producto
              </button>
            </form>
          </div>
        </div>
      )}

      <h3>Productos Existentes</h3>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">
                  <strong>Precio: </strong>${product.price}
                </p>
                <p className="card-text">
                  <strong>Categoría: </strong>{product.category}
                </p>
                <button 
                  className="btn btn-danger"
                  onClick={() => {
                    setProducts(products.filter(p => p.id !== product.id));
                    alert('Producto eliminado');
                  }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;