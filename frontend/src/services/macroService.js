import fetchWithAuth from '../utils/fetchWithAuth';
import authService from "./authService";

const URL_API = process.env.REACT_APP_API_URL;

class MacroService {
  async create(macro) {
    try {
      const response = await fetchWithAuth(`${URL_API}/macros`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(macro)
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error creating macro', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async update(macro) {
    try {
      const response = await fetchWithAuth(`${URL_API}/macros/${macro.button_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(macro)
      });
      if (response.ok) {
        
      } else {
        console.error('Error updating macro', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async getById() {
    try {
      const userId = authService.getCurrentUser().user.id;
      const response = await fetchWithAuth(`${URL_API}/macros/user/${userId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching macros by id', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/macros/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error deleting macro', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async getByUserId(userId) {
    try {
      const response = await fetchWithAuth(`${URL_API}/macros/user/${userId}`);
      if (response.ok) {
        return await response.json();
      } else {
        console.error('Error fetching macros by user id', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

const macroServiceInstance = new MacroService();

export default macroServiceInstance;