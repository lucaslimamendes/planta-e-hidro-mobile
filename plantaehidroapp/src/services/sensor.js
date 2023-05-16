import axios from 'axios';
import { getSensorValue } from './helix';

const urlDefault = 'https://planta-e-hidro-api-lab.azurewebsites.net';

export const getSensors = async ({ userId, setLoading, tokenJwt }) => {
  try {
    setLoading(true);
    const response = await axios.get(`${urlDefault}/v1/sensors/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokenJwt}`,
      },
    });

    const returnData = await response.data;

    for (const [index, data] of response.data.entries()) {
      const { sensorHelixEntityId, sensorHelixAttr } = data;

      const val = await getSensorValue({
        sensorHelixEntityId,
        sensorHelixAttr,
      });

      returnData[index].currentVal = val;
    }

    setLoading(false);
    return returnData;
  } catch (error) {
    console.log('error', error);
    setLoading(false);
    throw new Error(error);
  }
};

export const createSensor = async ({ data, tokenJwt, setLoading }) => {
  try {
    setLoading(true);
    const response = await axios.post(
      `${urlDefault}/v1/sensors`,
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
    const response = await axios.delete(
      `${urlDefault}/v1/sensors/${sensorId}`,
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
