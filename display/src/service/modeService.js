class ModeService {

  async getMode() {
    try {
      const response = await fetch(`http://localhost:4000/mode`);

      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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
}

const modeService = new ModeService();

export default modeService;