import fetchWithAuth from '../utils/fetchWithAuth'; // Ajustez le chemin en fonction de la structure de votre projet

const URL_API = process.env.REACT_APP_API_URL;

class AuthService {
  constructor() {
    this.currentUser = null;
  }

  async login(username, password) {
    try {
      const response = await fetch(`${URL_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      const result = {
        status: response.status,
        ...data,
      };
      if (data.accessToken) {
        localStorage.setItem("user", JSON.stringify(data));
        this.currentUser = data;
        window.location.reload();
      }

      return result;
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async logout() {
    console.log("Logout");
    try {
      const response = await fetchWithAuth(`${URL_API}/activeSessions/logout`, {
        method: 'PUT',
      });

      const data = await response.json();

      localStorage.removeItem("user");
      this.currentUser = null;
      window.location.reload();

      return data;
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  async register(username, password, role) {
    try {
      const roles = [role];
      const response = await fetch(`${URL_API}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, roles }),
      });

      return await response.json();
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  updateAccessToken(newToken) {
    const user = this.getCurrentUser();
    if (user) {
      user.accessToken = newToken;
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  async changePassword(newPassword) {
    try {
      const user = this.getCurrentUser();
      console.log("user", user);

      if (user) {
        const response = await fetchWithAuth(`${URL_API}/auth/modifyPassword/${user.user.id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword })
        });

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
        const response = await fetchWithAuth(`${URL_API}/auth/modifyPassword/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ newPassword })
        });

        return await response.json();
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error during password change:", error);
      throw error;
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  async updateFirstLogin(id) {
    try {
      const response = await fetchWithAuth(`${URL_API}/auth/updateFirstLogin/${id}`, {
        method: 'POST',
      });

      return await response.json();
    } catch (error) {
      console.error("Error during firstLogin:", error);
    }
  }
}

const authService = new AuthService();

export default authService;