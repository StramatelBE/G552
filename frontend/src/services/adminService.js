import fetchWithAuth from "../utils/fetchWithAuth";

const URL_API = process.env.REACT_APP_API_URL;

class AdminService {
  async getAdmin() {
    try {
      const response = await fetchWithAuth(`${URL_API}/admin`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async updateAdmin(adminUpdates) {
    try {
      const response = await fetchWithAuth(`${URL_API}/admin`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(adminUpdates),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const adminServiceInstance = new AdminService();

export default adminServiceInstance;
