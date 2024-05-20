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
          <div className='datos-usuarios'>
            <p>Nombre: {userData.name}</p>
            <p>Dirección: {userData.address}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleEdit}>Editar</button>
          </div>
        )}

        {editing && (
          <div>
            <form>
              <label>
                Nombre:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Dirección:
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
            </form>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Configuracion;
