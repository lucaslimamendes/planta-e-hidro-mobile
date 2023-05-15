import axios from 'axios';

const urlDefaul = 'https://planta-e-hidro-api-lab.azurewebsites.net';

export const createUser = async ({
  name,
  email,
  password,
  tokenMsg,
  setLoading,
}) => {
  try {
    setLoading(true);
    const response = await axios.post(`${urlDefaul}/v1/users`, {
      name,
      email,
      password,
      notifyToken: tokenMsg,
    });

    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error(error);
  }
};

export const createLogin = async ({ email, password, setLoading }) => {
  try {
    setLoading(true);
    const response = await axios.post(`${urlDefaul}/login`, {
      email,
      password,
    });

    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    throw new Error(error);
  }
};

export const updateUserNotify = async ({
  userId,
  notifyToken,
  setLoading,
  tokenJwt,
}) => {
  try {
    const response = await axios.patch(
      `${urlDefaul}/v1/users/${userId}`,
      {
        notifyToken,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenJwt}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
