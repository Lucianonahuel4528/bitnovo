import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
const API_URL = 'https://payments.pre-bnvo.com/api/v1/currencies'; // Replace with your actual API URL

export const getCurrencies = async () => {
    try {
        const deviceId = await DeviceInfo.getUniqueId(); // Obtén el ID del dispositivo
        console.log("deviceId",typeof deviceId)
        const response = await axios.get(API_URL, {
            headers: {
                'X-Device-Id': '2e178da6-ee05-458d-b72d-dee96b3d2663', // Incluye el ID del dispositivo en los encabezados
            },
        });
        console.log('response', response.data);
        return response.data; // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error('Error fetching333 currencies:', error.response?.status, error.response?.data);
    }
};