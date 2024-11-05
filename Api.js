import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
const API_URL = 'https://api.bitnovo.com/currencies_list'; // Replace with your actual API URL

const getCurrencies = async () => {
    const deviceId = await DeviceInfo.getUniqueId(); 
    console.log("Device ID:", deviceId); // Imprime el ID del dispositivo
    const response = await axios.get(API_URL, {
        headers: {
            'X-Device-Id':deviceId  // Replace with your actual device ID
        }
    });
    console.log(response.data)
    return response.data;
};

export default { getCurrencies };