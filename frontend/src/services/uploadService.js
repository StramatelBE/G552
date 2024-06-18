import { useSnackbar } from "../contexts/SnackbarContext";
import useAuthStore from "../stores/authStore";
import fetchWithAuth from "../utils/fetchWithAuth";

const URL_API = process.env.REACT_APP_API_URL;

function useUploadService() {
  const { openSnackbar } = useSnackbar();

  async function get() {
    const userId = useAuthStore.getState().user.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/medias/${userId}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      openSnackbar("Failed to retrieve files", "error");
      throw error;
    }
  }

  async function deleteFile(file) {
    try {
      const response = await fetchWithAuth(`${URL_API}/medias/${file.idBdd}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting file");
      }
      openSnackbar("File successfully deleted", "success");
      return await response;
    } catch (error) {
      console.error(error);
      openSnackbar("Failed to delete file", "error");
      throw error;
    }
  }

  async function upload(setLoading, file, setProgress) {
    if (file.size >= 1073741824) {
      // 1 GB
      openSnackbar("The file is too large (1 GB max)", "error");
      return;
    }

    setLoading(true);
    let formData = new FormData();
    formData.append("file", file);

    try {
      const username = useAuthStore.getState().user.username;
      const userId = useAuthStore.getState().user.id;
      const accessToken = useAuthStore.getState().token;
      const url = `${URL_API}/medias/${username}/${userId}`;

      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);

        xhr.upload.onprogress = (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          }
        };

        xhr.onload = () => {
          setLoading(false);
          if (xhr.status >= 200 && xhr.status < 300) {
            openSnackbar("File uploaded successfully", "success");
            resolve({
              data: JSON.parse(xhr.responseText),
              status: xhr.status,
            });
          } else {
            openSnackbar("Error uploading file", "error");
            reject(new Error("Error uploading file"));
          }
        };

        xhr.onerror = () => {
          setLoading(false);
          openSnackbar("An error occurred during file upload", "error");
          reject(new Error("An error occurred during file upload"));
        };

        xhr.setRequestHeader("Authorization", `Bearer ${accessToken}`);
        xhr.send(formData);
      });
    } catch (error) {
      setLoading(false);
      console.error(error);
      openSnackbar("An error occurred during file upload", "error");
      throw error;
    }
  }

  // ... any additional service functions

  return { get, deleteFile, upload };
}

export default useUploadService;