import fetchWithAuth from '../utils/fetchWithAuth';

const URL_API = process.env.REACT_APP_API_URL;

class UserService {
  
  static async  getAll() {
    try {
      const response = await fetchWithAuth(URL_API + "/users");
      console.log("response", response.json);
      return response.json();
    } catch (erreur) {
      console.error(erreur);
      throw erreur;
    }
  }
}



export default UserService;