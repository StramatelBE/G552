
import useAuthStore from '../stores/authStore';

async function fetchWithAuth(url, options = {}) {

  const accessToken = useAuthStore.getState().token;


  const headers = {
    ...options.headers,
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
  };

  try {
    const response = await fetch(url, { ...options, headers });

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