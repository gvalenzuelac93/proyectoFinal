import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductGallery.css'; 

const ProductGallery = ({ limit }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        const limitedProducts = limit ? data.slice(0, limit) : data;
        setProducts(limitedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Error al cargar los productos. Por favor, intente nuevamente.");
        setLoading(false);
      });
  }, [limit]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
   <div className='container'>
   <div className="product-gallery">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <div className="card h-100 product-card">
              <div className="card-img-wrapper">
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.title}
                />
              </div>
              <div className="card-body d-flex flex-column bg-light">
                <h5 className="card-title product-title">{product.title}</h5>
                <p className="card-text text-muted mb-2">
                  {product.category}
                </p>
                <p className="card-text product-description">
                  {product.description.length > 100 
                    ? `${product.description.substring(0, 100)}...` 
                    : product.description}
                </p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="price">${product.price}</span>
                    <button 
                      className="btn mi-boton"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default ProductGallery;