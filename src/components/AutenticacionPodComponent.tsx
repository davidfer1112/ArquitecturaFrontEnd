import React, { useEffect, useState } from 'react';
import {
  LoginButton,
  LogoutButton,
  useSession,
  SessionProvider
} from '@inrupt/solid-ui-react';

const AutenticacionPodComponent: React.FC = () => {
  const { session } = useSession();
  const [webId, setWebId] = useState<string | undefined>(session.info.webId);

  useEffect(() => {
    const verificarEstadoDeSesion = async () => {
      await session.handleIncomingRedirect({
        url: window.location.href,
        restorePreviousSession: true,
      });

      if (session.info.webId !== webId) {
        setWebId(session.info.webId);
      }
    };

    // Verifica el estado de la sesión inmediatamente y luego cada 5 segundos
    verificarEstadoDeSesion();
    const interval = setInterval(verificarEstadoDeSesion, 5000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [session, webId]); // Dependencias del efecto

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
          <button>
            Iniciar sesión con Inrupt
          </button>
        </LoginButton>
      ) : (
        <div>
          <p>Estás conectado como: {webId}</p>
          <LogoutButton onLogout={handleLogout}>
            <button>salir</button>
          </LogoutButton>
        </div>
      )}
    </SessionProvider>
  );
};

export default AutenticacionPodComponent;
