import axios from 'axios';

const urlDefaul = 'https://planta-e-hidro-api-lab.azurewebsites.net';

export const getSensors = async ({ userId, setLoading, tokenJwt }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${urlDefaul}/v1/sensors/${userId}`, {
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

export const createSensor = async ({ data, tokenJwt, setLoading }) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${urlDefaul}/v1/sensors`,
      {
        sensorHelixDeviceId: data.device_id,
        sensorHelixEntityId: data.entity_name,
        sensorHelixEntityType: data.entity_type,
        sensorHelixAttr: data.attributes[0].object_id,
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
    setLoading(false);
    throw new Error(error);
  }
};

export const deleteSensor = async ({ sensorId, tokenJwt, setLoading }) => {
  try {
    setLoading(true);
    const response = await axios.delete(`${urlDefaul}/v1/sensors/${sensorId}`, {
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
