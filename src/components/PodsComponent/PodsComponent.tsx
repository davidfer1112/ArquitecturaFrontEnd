// Importar dependencias necesarias
import { fetch as solidFetch } from '@inrupt/solid-client-authn-browser';
import {
  getSolidDataset,
  getThing,
  createSolidDataset,
  getStringNoLocale,
  getContainedResourceUrlAll,
  createContainerAt,
  createThing,
  buildThing,
  saveSolidDatasetAt,
  setThing  
} from '@inrupt/solid-client';
import { UserDataModel } from '../../models/UserDataModel';

// URL del vocabulario VCARD, para uso en los datos
export const VCARD = "http://www.w3.org/2006/vcard/ns#";

// Funciones exportadas
export async function fetchUserData(webId: string) {
    try {
        const myDataset = await getSolidDataset(webId);
        
        if (!myDataset) {
          console.error("El conjunto de datos es nulo");
          return null;
        }
    
        const profile = getThing(myDataset, webId);
        
        if (!profile) {
          console.error("El perfil es nulo");
          return null;
        }
    
        const name = getStringNoLocale(profile, 'http://www.w3.org/2006/vcard/ns#fn');
        console.log('Nombre obtenido:', name);  
        return name;
      } catch (error) {
        console.error("Error al obtener datos:", error);
        return null;
      }
}

export async function fetchContainerContents(containerUrl: string) {
    try {
        const dataset = await getSolidDataset(containerUrl);
        const contents = getContainedResourceUrlAll(dataset);
        console.log('Contenidos del contenedor:', contents);  
        return contents;
      } catch (error) {
        console.error("Error al obtener los contenidos del contenedor:", error);
        return [];
      }
}

export async function createFolder(containerUrl: string): Promise<boolean> {
    try {
        // Intenta crear el contenedor usando el cliente HTTP autenticado
        await createContainerAt(containerUrl, { fetch: solidFetch });
        console.log('Contenedor creado exitosamente:', containerUrl);
        return true;
      } catch (error) {
        console.error('Error al crear el contenedor:', error);
        return false;
      }
}

export async function createUserData(containerUrl: string, userData: UserDataModel):Promise<boolean> {
    try {
        let dataset = createSolidDataset();
        let profile = buildThing(createThing({ name: "profile" }))
          .addStringNoLocale(VCARD + "fn", userData.name)
          .addStringNoLocale(VCARD + "hasAddress", userData.address)
          .addStringNoLocale(VCARD + "hasEmail", userData.email)
          .build();
    
        // Agrega el Thing al dataset
        dataset = setThing(dataset, profile);
    
        // Construye la URL completa para el archivo
        const fileUrl = containerUrl + "userData.ttl";
    
        // Guarda el dataset en el POD utilizando solidFetch para la autenticación
        await saveSolidDatasetAt(fileUrl, dataset, { fetch: solidFetch });
        console.log('Datos del usuario guardados exitosamente en:', fileUrl);
        alert('Datos del usuario guardados exitosamente!');
        return true;
      } catch (error) {
        console.error('Error al guardar los datos del usuario:', error);
        alert('Error al guardar los datos del usuario');
        return false;
      }
}

export async function fetchUserDataFromPod(fileUrl: string): Promise<UserDataModel | null> {
    try {
        const dataset = await getSolidDataset(fileUrl, { fetch: solidFetch });
        const profile = getThing(dataset, fileUrl + "#profile"); 
    
        if (!profile) {
          return null;
        }
    
        const name = getStringNoLocale(profile, VCARD + "fn");
        const address = getStringNoLocale(profile, VCARD + "hasAddress");
        const email = getStringNoLocale(profile, VCARD + "hasEmail");
    
        if (!name || !address || !email) {
          return null;
        }
    
        return { name, address, email };
      } catch (error) {
        console.error("Error al obtener datos del usuario:", error);
        return null;
      }
}
