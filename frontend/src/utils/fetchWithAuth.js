
import authService from '../services/authService';

async function fetchWithAuth(url, options = {}) {
  // Récupérer l'utilisateur courant et son token d'accès.
  const currentUser = authService.getCurrentUser();
  const accessToken = currentUser?.accessToken;

  // Ajouter le token d'accès aux en-têtes de la requête si disponible.
  const headers = {
    ...options.headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  };

  try {
    const response = await fetch(url, { ...options, headers });

    // Vérifier les réponses non autorisées (401 Unauthorized)
    if (!response.ok && response.status === 401) {
      console.log("error.response.status === 401");
      localStorage.removeItem("user");
      window.location.reload();
    }

    return response;
  } catch (error) {
    console.error("Network error", error);
    throw error;
  }
}
export default fetchWithAuth;