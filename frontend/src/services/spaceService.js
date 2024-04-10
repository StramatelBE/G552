import fetchWithAuth from '../utils/fetchWithAuth';

const URL_API = process.env.REACT_APP_API_URL;

class ScoreService {

  async getSpace() {
    const response = await fetchWithAuth(`${URL_API}/space`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }



  // Additional methods here if necessary...
}

const spaceService = new ScoreService();
export default spaceService;