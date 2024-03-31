import React, { useEffect, useState } from 'react';
import { LoginButton, LogoutButton, useSession, SessionProvider } from '@inrupt/solid-ui-react';
import * as rdf from 'rdflib';

const AutenticacionPodComponent: React.FC = () => {
  const { session } = useSession();
  const [webId, setWebId] = useState<string | undefined>();
  const [podStorage, setPodStorage] = useState<string | undefined>();

  useEffect(() => {
    const verificarEstadoDeSesion = async () => {
      if (!session.info.isLoggedIn) {
        await session.handleIncomingRedirect({
          url: window.location.href,
          restorePreviousSession: true,
        });
      }

      if (session.info.webId && session.info.webId !== webId) {
        setWebId(session.info.webId);
        buscarPodStorage(session.info.webId);
      }
    };

    verificarEstadoDeSesion();
    const interval = setInterval(verificarEstadoDeSesion, 5000);
    return () => clearInterval(interval);
  }, [session, webId]);

  const buscarPodStorage = (webId: string) => { 
    const store = rdf.graph();
    const fetcher = new rdf.Fetcher(store);
    const profileDoc = rdf.sym(webId);
    const pim = rdf.Namespace('http://www.w3.org/ns/pim/space#');

    fetcher.load(profileDoc).then(() => {
      const storageUrls = store.each(profileDoc, pim('storage'), null, profileDoc.doc());
      if (storageUrls.length > 0) {
        setPodStorage(storageUrls[0].value);
      } else {
        console.log('No se encontró la URL del almacenamiento POD.');
      }
    }).catch(err => {
      console.error('Error al cargar el perfil del WebID:', err);
    });
  };

  const handleLogout = async () => {
    await session.logout();
    window.location.reload();
  };

  return (
    <SessionProvider sessionId="unique-session-id">
      {!webId ? (
        <LoginButton
          oidcIssuer="https://login.inrupt.com"
          redirectUrl={window.location.href}
        >
          <button>Iniciar sesión con Inrupt</button>
        </LoginButton>
      ) : (
        <div>
          <p>Estás conectado como: {webId}</p>
          {podStorage && <p>Tu almacenamiento POD está en: {podStorage}</p>}
          <LogoutButton onLogout={handleLogout}>
            <button>Salir</button>
          </LogoutButton>
        </div>
      )}
    </SessionProvider>
  );
};

export default AutenticacionPodComponent;
