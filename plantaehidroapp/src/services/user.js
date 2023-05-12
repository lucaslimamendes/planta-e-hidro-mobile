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
