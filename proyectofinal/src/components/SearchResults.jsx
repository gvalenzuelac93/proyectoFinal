import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchProducts, sortResults } from '../services/searchService';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('relevance');
  const query = searchParams.get('q')?.toLowerCase();

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      setLoading(true);
      setError(null);

      try {
        const searchResults = await searchProducts(query);
        const sortedResults = sortResults(searchResults, sortBy);
        setResults(sortedResults);
      } catch (err) {
        setError('Error al buscar productos. Por favor, intente nuevamente.');
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query, sortBy]);

  const handleSort = (value) => {
    setSortBy(value);
    const newResults = sortResults(results, value);
    setResults(newResults);
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Resultados para "{query}"</h2>
        <select 
          className="form-select w-auto" 
          value={sortBy} 
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="relevance">Relevancia</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
          <option value="name">Nombre</option>
        </select>
      </div>

      {results.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron resultados para "{query}"
        </div>
      ) : (
        <>
          <p className="text-muted mb-4">
            Se encontraron {results.length} resultados
          </p>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {results.map(product => (
              <div key={product.id} className="col">
                <div className="card h-100">
                  <img 
                    src={product.image} 
                    className="card-img-top" 
                    alt={product.title}
                    style={{ height: '200px', objectFit: 'contain' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">
                      {product.description.length > 100 
                        ? `${product.description.substring(0, 100)}...` 
                        : product.description}
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Categoría: {product.category}</small>
                    </p>
                    <p className="card-text">
                      <strong>Precio: ${product.price}</strong>
                    </p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchResults;