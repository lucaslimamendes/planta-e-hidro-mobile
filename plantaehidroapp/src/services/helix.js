import axios from 'axios';

const urlDefault = 'http://plantaehidro.eastus.cloudapp.azure.com';

const lowercaseKeys = obj => {
  return Object.keys(obj).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = obj[key];
    return accumulator;
  }, {});
};

export const getStatusHelix = async () => {
  try {
    const response = await axios.get(`${urlDefault}:1026/version`);

    return response.data.orion.uptime ? true : false;
  } catch (error) {
    return false;
  }
};

export const getDevice = async ({ setLoading, deviceId }) => {
  try {
    setLoading(true);
    const response = await axios.get(
      `${urlDefault}:4041/iot/devices/${deviceId}`,
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
    throw new Error(error);
  }
};

export const getSensorValue = async ({
  sensorHelixEntityId,
  sensorHelixAttr,
}) => {
  try {
    const response = await axios.get(
      `${urlDefault}:1026/v2/entities/${sensorHelixEntityId}/attrs`,
      {
        headers: {
          'fiware-service': 'helixiot',
          'fiware-servicepath': '/',
        },
      }
    );

    const newData = lowercaseKeys(response.data);

    return newData[sensorHelixAttr.toLowerCase()].value;
  } catch (error) {
    throw new Error(error);
  }
};
