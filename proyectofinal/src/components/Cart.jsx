import React, { useContext, useMemo, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

console.log("esto es el carrito", cart)
  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce(
      (acc, item) => ({
        totalItems: acc.totalItems + item.cantidad,
        totalPrice: acc.totalPrice + item.price * item.cantidad,
      }),
      { totalItems: 0, totalPrice: 0 }
    );
  }, [cart]);

  const handleProceedToCheckout = () => {
    if (!user) {
      alert('Por favor, inicia sesión para continuar con la compra');
      navigate('/login');
    } else {
      setIsProcessingOrder(true);
      setTimeout(() => {
        alert('¡Compra realizada con éxito!');
        clearCart();
        setIsProcessingOrder(false);
      }, 2000);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <div className="alert alert-info">
          Tu carrito está vacío
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.nombre} 
                      className="img-fluid"
                      style={{ maxHeight: '100px' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title">{item.nombre}</h5>
                    <p className="card-text text-muted">{item.categoria}</p>
                  </div>
                  <div className="col-md-2">
                    <p className="card-text">Cantidad: {item.cantidad}</p>
                  </div>
                  <div className="col-md-2">
                    <p className="card-text">
                      Precio: ${(item.price * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                  <div className="col-md-2">
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Resumen del Carrito</h5>
              <div className="row">
                <div className="col-md-6">
                  <p className="card-text">Cantidad total de artículos: {totalItems}</p>
                </div>
                <div className="col-md-6">
                  <p className="card-text">
                    <strong>Total a pagar: ${totalPrice.toFixed(2)}</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button 
              className="btn btn-primary"
              onClick={handleProceedToCheckout}
              disabled={isProcessingOrder}
            >
              {isProcessingOrder ? 'Procesando...' : (user ? 'Realizar Compra' : 'Iniciar sesión para comprar')}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;