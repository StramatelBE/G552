import fetchWithAuth from "../utils/fetchWithAuth";
const URL_API = process.env.REACT_APP_API_URL;
class ModeService {
  async getMode() {
    try {
      const response = await fetchWithAuth(`${URL_API}/mode`);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
      } else {
        console.error(
          "No mode found or error in response",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async setMode(mode) {
    console.log(JSON.stringify(mode));
    try {
      const response = await fetchWithAuth(`${URL_API}/mode/1`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mode),
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

const modeServiceInstance = new ModeService();

export default modeServiceInstance;
