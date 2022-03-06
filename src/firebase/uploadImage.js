import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const storage = getStorage();

const uploadImage = async (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  const downloadUrl = await uploadBytes(storageRef, file).then(async () => {
    const url =  await getDownloadURL(storageRef);
    return url;
  });

  return downloadUrl;
}

export { uploadImage };