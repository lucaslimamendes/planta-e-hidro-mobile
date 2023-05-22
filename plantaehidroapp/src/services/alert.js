import axios from 'axios';

const urlDefault = 'https://planta-e-hidro-api-lab.azurewebsites.net';

export const getAlerts = async ({ userId, setLoading, tokenJwt }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${urlDefault}/v1/alerts/${userId}`, {
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

export const createAlert = async ({ data, tokenJwt, setLoading }) => {
  try {
    console.log('tokenJwt', tokenJwt);
    setLoading(true);
    const response = await axios.post(
      `${urlDefault}/v1/alerts`,
      {
        sensorId: data.sensorId,
        value: Number(data.value),
        lessOrGreater: Number(data.lessOrGreater),
      },
      {
        headers: {
          Authorization: `Bearer ${tokenJwt}`,
        },
      }
    );

    setLoading(false);
    return response.data;
  } catch (error) {
    console.log('error', error);
    setLoading(false);
    throw new Error(error);
  }
};

export const deleteAlert = async ({ alertId, setLoading, tokenJwt }) => {
  try {
    setLoading(true);
    const response = await axios.delete(`${urlDefault}/v1/alerts/${alertId}`, {
      headers: {
        Authorization: `Bearer ${tokenJwt}`,
      },
    });

    setLoading(false);
    return response.status;
  } catch (error) {
    setLoading(false);
    throw new Error(error);
  }
};
