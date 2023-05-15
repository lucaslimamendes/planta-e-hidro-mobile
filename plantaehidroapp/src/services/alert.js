import axios from 'axios';

const urlDefaul = 'https://planta-e-hidro-api-lab.azurewebsites.net';

export const getAlerts = async ({ userId, setLoading, tokenJwt }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${urlDefaul}/v1/alerts/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenJwt}`,
      },
    });

    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error(error);
  }
};
