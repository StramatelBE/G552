import fetchWithAuth from "../utils/fetchWithAuth";
import authService from "./authService";
import { useSnackbar } from "../contexts/SnackbarContext";

const URL_API = process.env.REACT_APP_API_URL;

function useUploadService() {
  const { openSnackbar } = useSnackbar();

  async function get() {
    const userId = authService.getCurrentUser().user.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/medias/${userId}`);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      console.log("response", response);
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

  async function upload(setLoading, file, setprogress) {
    if (file.size >= 1073741824) {
      // 1 GB
      openSnackbar("The file is too large (1 GB max)", "error");
      return;
    }

    setLoading(true);
    let formData = new FormData();
    formData.append("file", file);

    try {
      const username = authService.getCurrentUser().user.username;
      const userId = authService.getCurrentUser().user.id;
      const response = await fetchWithAuth(
        `${URL_API}/medias/${username}/${userId}`,
        {
          method: "POST",
          body: formData,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setprogress(percentCompleted);
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error uploading file");
      }
      openSnackbar("File uploaded successfully", "success");
      return {
        data: await response.json(),
        status: response.status,
      };
    } catch (error) {
      console.error(error);
      openSnackbar("An error occurred during file upload", "error");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  // ... any additional service functions

  return { get, deleteFile, upload };
}

export default useUploadService;
