import fetchWithAuth from '../utils/fetchWithAuth';

const URL_API = process.env.REACT_APP_API_URL; // Make sure you have REACT_APP_API_URL in your .env file

class VeilleService {
  async getByUserId(id) {
    console.log("getByUserId", id);
    try {
      const response = await fetchWithAuth(`${URL_API}/veilles/1`);
      return await response.json(); // Assuming fetchWithAuth returns a fetch-like Response object.
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async create(veille) {
    try {
      const response = await fetchWithAuth(`${URL_API}/veilles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(veille),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(updates) {
    try {
      const response = await fetchWithAuth(`${URL_API}/veilles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/veilles/${id}`, {
        method: 'DELETE',
      });
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const veilleServiceInstance = new VeilleService();

export default veilleServiceInstance;