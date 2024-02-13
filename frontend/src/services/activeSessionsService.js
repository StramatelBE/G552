import fetchWithAuth  from '../utils/fetchWithAuth'; // Ajustez le chemin selon la structure de votre projet

const URL_API = process.env.REACT_APP_API_URL;

class ActiveSessionsService {
  async deleteCurrentUser() {
    console.log("Logout");
    try {
      const response = await fetchWithAuth(`${URL_API}/activeSessions/logout`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la déconnexion");
      }

      const message = await response.json();
      console.log("message", message);
      
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API:", error);
    }
  }
}

const activeSessionsServiceInstance = new ActiveSessionsService();

export default activeSessionsServiceInstance;