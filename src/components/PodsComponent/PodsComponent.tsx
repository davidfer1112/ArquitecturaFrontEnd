// Importar dependencias necesarias
import { fetch as solidFetch, Session } from '@inrupt/solid-client-authn-browser';
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
  setThing,
} from '@inrupt/solid-client';
import { UserDataModel } from '../../models/UserDataModel';

// URL del vocabulario VCARD, para uso en los datos
export const VCARD = "http://www.w3.org/2006/vcard/ns#";

// Funciones exportadas
export async function fetchUserData(webId: string): Promise<string | null> {
  try {
    const myDataset = await getSolidDataset(webId, { fetch: solidFetch });
    
    if (!myDataset) {
      console.error("El conjunto de datos es nulo");
      return null;
    }

    const profile = getThing(myDataset, webId);
    
    if (!profile) {
      console.error("El perfil es nulo");
      return null;
    }

    const name = getStringNoLocale(profile, VCARD + 'fn');
    console.log('Nombre obtenido:', name);  
    return name;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return null;
  }
}

export async function fetchContainerContents(containerUrl: string): Promise<string[]> {
  try {
    const dataset = await getSolidDataset(containerUrl, { fetch: solidFetch });
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
    await createContainerAt(containerUrl, { fetch: solidFetch });
    console.log('Contenedor creado exitosamente:', containerUrl);
    return true;
  } catch (error) {
    console.error('Error al crear el contenedor:', error);
    return false;
  }
}

export async function createUserData(containerUrl: string, userData: UserDataModel): Promise<boolean> {
  try {
    let dataset = createSolidDataset();
    let profile = buildThing(createThing({ name: "profile" }))
      .addStringNoLocale(VCARD + "fn", userData.name)
      .addStringNoLocale(VCARD + "hasAddress", userData.address)
      .addStringNoLocale(VCARD + "hasEmail", userData.email)
      .build();

    dataset = setThing(dataset, profile);
    const fileUrl = containerUrl + "userData.ttl";

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

export async function fetchUserDataFromPod(fileUrl: string, session: Session): Promise<UserDataModel | null> {
  try {
    const dataset = await getSolidDataset(fileUrl, { fetch: session.fetch });
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

export const updateUserDataInPod = async (fileUrl: string, data: UserDataModel, session: Session): Promise<boolean> => {
  try {
    const dataset = await getSolidDataset(fileUrl, { fetch: session.fetch });
    let thing = getThing(dataset, fileUrl + "#profile"); 
    if (!thing) {
      thing = createThing({ name: "profile" });
    }

    const updatedThing = buildThing(thing)
      .setStringNoLocale(VCARD + "fn", data.name)
      .setStringNoLocale(VCARD + "hasAddress", data.address)
      .setStringNoLocale(VCARD + "hasEmail", data.email)
      .build();

    const updatedDataset = setThing(dataset, updatedThing);
    await saveSolidDatasetAt(fileUrl, updatedDataset, { fetch: session.fetch });
    return true;
  } catch (error) {
    console.error('Error updating user data in POD:', error);
    return false;
  }
};
