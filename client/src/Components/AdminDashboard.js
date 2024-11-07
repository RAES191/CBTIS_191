import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost/test/add_announcement.php', {
      title,
      content,
      email
    }).then(response => {
      setStatus('Anuncio agregado exitosamente');
      setTitle('');
      setContent('');
      setEmail('');
    }).catch(error => {
      setStatus('Error al agregar el anuncio');
      console.error(error);
    });
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Agregar Anuncio</h1>
      <form onSubmit={handleSubmit} className="announcement-form">
        <div className="form-group">
          <label>Título</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Contenido</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Email del Padre</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Agregar Anuncio</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default AdminDashboard;
