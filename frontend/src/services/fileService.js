import fetchWithAuth  from '../utils/fetchWithAuth';

// Utilisez l'URL de l'API à partir de la variable d'environnement
const URL_API = process.env.REACT_APP_API_URL;

class FileService {
  // get files
  async get() {
    try {
      const response = await fetchWithAuth(`${URL_API}/files`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // update file
  async update(file) {
    try {
      const response = await fetchWithAuth(`${URL_API}/file/${file._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.fileName,
          format: file.format,
          path: file.path,
          duration: file.duration,
          name: file.name
        })
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // delete file
  async delete(file) {
    try {
      const response = await fetchWithAuth(`${URL_API}/file/${file._id}`, {
        method: 'DELETE'
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // post file
  async post(file) {
    try {
      const response = await fetchWithAuth(`${URL_API}/files`, {
        method: 'POST',
        body: file // Assuming file is already FormData if you're uploading files
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }

  // put file
  async put(file) {
    try {
      const response = await fetchWithAuth(`${URL_API}/file/${file._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          duration: file.duration
        })
      });
      return response.json();
    } catch (error) {
      throw error;
    }
  }
}

const fileServiceInstance = new FileService();

export default fileServiceInstance;