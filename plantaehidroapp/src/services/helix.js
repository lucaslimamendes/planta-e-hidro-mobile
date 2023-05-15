import axios from 'axios';

const urlDefaul = 'http://plantaehidro.eastus.cloudapp.azure.com';

export const getStatusHelix = async ({ setLoading }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${urlDefaul}:1026/version`);

    setLoading(false);
    return response.data.orion.uptime ? true : false;
  } catch (error) {
    setLoading(false);
    return false;
  }
};

export const getDevice = async ({ setLoading, deviceId }) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${urlDefaul}:4041/iot/devices/${deviceId}`,
      {
        headers: {
          'fiware-service': 'helixiot',
          'fiware-servicepath': '/',
        },
      }
    );

    setLoading(false);
    return response.data;
  } catch (error) {
    setLoading(false);
    return false;
  }
};
