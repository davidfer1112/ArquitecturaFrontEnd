// Configuracion.tsx
import React, { useState, useEffect } from 'react';
import { useSession } from "@inrupt/solid-ui-react";
import {
  fetchUserDataFromPod,
  updateUserDataInPod
} from '../../components/PodsComponent/PodsComponent';
import { UserDataModel } from '../../models/UserDataModel';
import Header from "../../components/Header-component/heder-component";
import Footer from "../../components/Footer-component/footer-component";
import "./Configuracion.css";

const Configuracion = () => {
  const { session } = useSession();
  const webId = session.info.webId;
  const [userData, setUserData] = useState<UserDataModel | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<UserDataModel>({
    name: '',
    address: '',
    email: ''
  });

  useEffect(() => {
    if (webId && session.info.isLoggedIn) {
      const loadUserData = async () => {
        const baseUrl = webId.replace('profile/card#me', '');
        const fileUrl = `${baseUrl}public/miportal/userData.ttl`;
        const data = await fetchUserDataFromPod(fileUrl, session);
        setUserData(data ? { name: data.name || '', address: data.address || '', email: data.email || '' } : null);
      };
      loadUserData();
    }
  }, [webId, session]);

  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setFormData(userData || { name: '', address: '', email: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    if (session.info.isLoggedIn) {
      const baseUrl = webId ? webId.replace('profile/card#me', '') : '';
      const fileUrl = `${baseUrl}public/miportal/userData.ttl`;
      const result = await updateUserDataInPod(fileUrl, formData, session);
      if (result) {
        setUserData(formData);
        setEditing(false);
        alert('Datos actualizados con éxito');
      } else {
        alert('Error al actualizar los datos');
      }
    } else {
      alert('Usuario no autenticado');
    }
  };

  return (
    <>
      <Header />

      <section className="section-configuracion">
        <h1>Configuración del Usuario</h1>

        {userData && !editing && (
          <div className="user-info">
            <p>Nombre: {userData.name}</p>
            <p>Dirección: {userData.address}</p>
            <p>Email: {userData.email}</p>
            <button className="edit-button" onClick={handleEdit}>Editar</button>
          </div>
        )}

        {editing && (
          <div className="form-container">
            <form className="user-form">
              <div className="wave-group">
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="input" />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 } as React.CSSProperties}>N</span>
                  <span className="label-char" style={{ "--index": 1 } as React.CSSProperties}>a</span>
                  <span className="label-char" style={{ "--index": 2 } as React.CSSProperties}>m</span>
                  <span className="label-char" style={{ "--index": 3 } as React.CSSProperties}>e</span>
                </label>
              </div>
              <div className="wave-group">
                <input required type="text" name="address" value={formData.address} onChange={handleChange} className="input" />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 } as React.CSSProperties}>A</span>
                  <span className="label-char" style={{ "--index": 1 } as React.CSSProperties}>d</span>
                  <span className="label-char" style={{ "--index": 2 } as React.CSSProperties}>d</span>
                  <span className="label-char" style={{ "--index": 3 } as React.CSSProperties}>r</span>
                  <span className="label-char" style={{ "--index": 4 } as React.CSSProperties}>e</span>
                  <span className="label-char" style={{ "--index": 5 } as React.CSSProperties}>s</span>
                  <span className="label-char" style={{ "--index": 6 } as React.CSSProperties}>s</span>
                </label>
              </div>
              <div className="wave-group">
                <input required type="email" name="email" value={formData.email} onChange={handleChange} className="input" />
                <span className="bar"></span>
                <label className="label">
                  <span className="label-char" style={{ "--index": 0 } as React.CSSProperties}>E</span>
                  <span className="label-char" style={{ "--index": 1 } as React.CSSProperties}>m</span>
                  <span className="label-char" style={{ "--index": 2 } as React.CSSProperties}>a</span>
                  <span className="label-char" style={{ "--index": 3 } as React.CSSProperties}>i</span>
                  <span className="label-char" style={{ "--index": 4 } as React.CSSProperties}>l</span>
                </label>
              </div>
            </form>
            <div className="botones-inicial bonton-config">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel}>Cancelar</button>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Configuracion;
