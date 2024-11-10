import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'orders', 'security'
  const [editedUser, setEditedUser] = useState({
    ...user,
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Ejemplo de historial de pedidos (reemplazar con datos reales)
  const [orderHistory] = useState([
    {
      id: '1',
      date: '2023-11-20',
      total: 150.00,
      status: 'Entregado',
      items: [
        { name: 'Producto 1', quantity: 2, price: 50.00 },
        { name: 'Producto 2', quantity: 1, price: 50.00 },
      ]
    },
    // Más pedidos...
  ]);

  if (!user) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning">
          No estás autenticado. Por favor, inicia sesión para ver tu perfil.
        </div>
      </div>
    );
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUser(editedUser);
    setIsEditing(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    alert('Contraseña actualizada exitosamente');
    setIsChangingPassword(false);
    setPasswords({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const renderProfile = () => (
    <div className="card">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h3 className="mb-0">Información Personal</h3>
        <button 
          className="btn btn-light"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <div className="row">
              <div className="col-md-4 text-center mb-3">
                <img
                  src={editedUser.avatar || 'https://via.placeholder.com/150'}
                  alt="Avatar"
                  className="img-fluid rounded-circle mb-2"
                />
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                />
              </div>
              <div className="col-md-8">
                <div className="mb-3">
                  <label className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono:</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={editedUser.phone || ''}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección:</label>
                  <textarea
                    className="form-control"
                    value={editedUser.address || ''}
                    onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                  />
                </div>
                <button type="submit" className="btn mi-boton">
                  Guardar Cambios
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="row">
            <div className="col-md-4 text-center">
              <img
                src={user.avatar || 'https://via.placeholder.com/150'}
                alt="Avatar"
                className="img-fluid rounded-circle mb-2"
              />
            </div>
            <div className="col-md-8">
              <table className="table">
                <tbody>
                  <tr>
                    <th>Nombre:</th>
                    <td>{user.name}</td>
                  </tr>
                  <tr>
                    <th>Email:</th>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <th>Teléfono:</th>
                    <td>{user.phone || 'No especificado'}</td>
                  </tr>
                  <tr>
                    <th>Dirección:</th>
                    <td>{user.address || 'No especificada'}</td>
                  </tr>
                  <tr>
                    <th>Rol:</th>
                    <td>{user.role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Historial de Pedidos</h3>
      </div>
      <div className="card-body">
        {orderHistory.map((order) => (
          <div key={order.id} className="card mb-3">
            <div className="card-header">
              <div className="d-flex justify-content-between">
                <span>Pedido #{order.id}</span>
                <span>Fecha: {order.date}</span>
              </div>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.quantity * item.price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                      <td><strong>${order.total.toFixed(2)}</strong></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="mt-2">
                <span className={`badge bg-${order.status === 'Entregado' ? 'success' : 'primary'}`}>
                  {order.status} </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Cambiar Contraseña</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handlePasswordChange}>
          <div className="mb-3">
            <label className="form-label">Contraseña Actual:</label>
            <input
              type="password"
              className="form-control"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Nueva Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Nueva Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
              required
            />
          </div>
          <button type="submit" className="btn mi-boton">
            Cambiar Contraseña
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            Perfil
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
            Historial de Pedidos
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'security' ? 'active' : ''}`} onClick={() => setActiveTab('security')}>
            Seguridad
          </button>
        </li>
      </ul>
      <div className="mt-3">
        {activeTab === 'profile' && renderProfile()}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'security' && renderSecurity()}
      </div>
    </div>
  );
};

export default Profile;