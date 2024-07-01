import fetchWithAuth from "../utils/fetchWithAuth"; // Ajustez le chemin en fonction de la structure de votre projet
import useAuthStore from "../stores/authStore"; // Importation du store

const URL_API = process.env.REACT_APP_API_URL;

class AuthService {
  constructor() {
    this.currentUser = null;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${URL_API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const result = {
        status: response.status,
        ...data,
      };
      if (data.accessToken) {
        useAuthStore.getState().setToken(data.accessToken); 
        useAuthStore.getState().setUser(data.user); 
        this.currentUser = data.user;
      }

      return result;
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async logout() {
    useAuthStore.getState().setToken(null); 
    useAuthStore.getState().setUser(null); 
    try {
     await fetchWithAuth(`${URL_API}/activeSessions/logout`, {
        method: "PUT",
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  async register(username, password, role) {
    try {
      const roles = [role];
      const response = await fetch(`${URL_API}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, roles }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  async changePassword(newPassword) {
    try {
        const user = useAuthStore.getState().user;
      if (user) {
        const response = await fetchWithAuth(
          `${URL_API}/auth/modifyPassword/${user.id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
          }
        );

        return await response.json();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error during password change:", error);
      throw error;
    }
  }

  async lostPassword(newPassword, id) {
    try {
      if (id) {
        const response = await fetchWithAuth(
          `${URL_API}/auth/modifyPassword/${id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
          }
        );

        return await response.json();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error during password change:", error);
      throw error;
    }
  }

  async updateFirstLogin(id) {
    try {
      const response = await fetchWithAuth(
        `${URL_API}/auth/updateFirstLogin/${id}`,
        {
          method: "POST",
        }
      );

      return await response.json();
    } catch (error) {
      console.error("Error during firstLogin:", error);
    }
  }

  async updateLanguage(language, id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/users/updateLanguage/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language }),
      });
  
      return await response.json();
    } catch (error) {
      console.error("Error during language update:", error);
    }
  }
}

const authService = new AuthService();

export default authService;
