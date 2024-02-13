import fetchWithAuth from '../utils/fetchWithAuth';
import authService from "./authService";

// Use environment variable for the API URL
const URL_API = process.env.REACT_APP_API_URL;

class ScoreService {
  // Get the current user's ID
  getCurrentUserId() {
    const currentUser = authService.getCurrentUser();
    return currentUser ?  currentUser.user.id : null; // Adjusted to match expected user object structure
  }

  // Get all scores for the current user
  async getByUserId() {
    const userId = this.getCurrentUserId();
    console.log("userId", userId);
    if (!userId) {
      throw new Error("No user id found");
    }
    const response = await fetchWithAuth(`${URL_API}/scores/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Add a score
  async addScore(score) {
    const response = await fetchWithAuth(`${URL_API}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Update a score
  async updateScore(scoreId, score) {
    const response = await fetchWithAuth(`${URL_API}/scores/${scoreId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Delete a score
  async deleteScore(scoreId) {
    const response = await fetchWithAuth(`${URL_API}/scores/${scoreId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  }

  // Additional methods here if necessary...
}

const scoreService = new ScoreService();
export default scoreService;