import fetchWithAuth from '../utils/fetchWithAuth';
import AuthService from './authService';

const URL_API = process.env.REACT_APP_API_URL;

class EventService {
  static async create(name) {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, userId }),
      });
      if (response.ok) {
        return true;
      } else {
        console.error('Error creating event', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async get() {
    const currentUser = AuthService.getCurrentUser();
    const userId = currentUser?.user?.id;
    try {
      const response = await fetchWithAuth(`${URL_API}/events/user/${userId}`);
      if (response.ok) {
        return response.json();
      } else {
        console.error('No event found or error in response', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
    static async getById(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/events/${id}`);
      if (response.ok) {
        return response.json();
      } else {
        console.error('Event not found or error in response', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/events/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return true; 
      } else {
        console.error('Error deleting event', response.statusText);
        return null;
      }
    } catch (error) {
      throw error;
    }
  }
}

export default EventService;