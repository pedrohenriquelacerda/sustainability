import { Trash } from "./types/Trash"
import { trashStorage } from "./firebaseConfig";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";

const TRASH_FOLDER_NAME = "trash";

const findAll = async (): Promise<Trash[]> => {
  let list: Trash[] = [];

  const trashFolder = ref(trashStorage, TRASH_FOLDER_NAME);
  const trashList = await listAll(trashFolder);

  for (let trash of trashList.items) {
    const trashUrl = await getDownloadURL(trash);

    list.push({
      lat: trash.name,
      lng: trashUrl,
      type: trash.fullPath
    });
  }

  return list;
}

const create = async (file: File): Promise<Trash> => {
  //const id = uuid();
  const fileReference = ref(trashStorage, `${TRASH_FOLDER_NAME}/${id}`);

  const upload = await uploadBytes(fileReference, file);
  const trashUrl = await getDownloadURL(upload.ref);

  const createdtrash: Trash = {
    name: upload.ref.name,
    url: trashUrl
  }

  return createdtrash;
}

export default { findAll, create };