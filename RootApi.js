import axios from 'axios';
import DeviceInfo from 'react-native-device-info';
const API_URL = 'https://payments.pre-bnvo.com/api/v1'; // Replace with your actual API URL

export const getCurrencies = async () => {
    try {
        const deviceId = await DeviceInfo.getUniqueId(); // Obtén el ID del dispositivo
        console.log("deviceId",typeof deviceId)
        const response = await axios.get(`${API_URL}/currencies`, {
            headers: {
                'X-Device-Id': '2e178da6-ee05-458d-b72d-dee96b3d2663', 
            },
        });
        return response.data; // Devuelve los datos obtenidos de la API
    } catch (error) {
        console.error('Error fetching currencies:', error.response?.status, error.response?.data);
    }
};


  export const createOrder = async (orderData) => {
    try {
      const formData = new FormData();        
        formData.append('expected_output_amount', orderData.expected_output_amount); 
        formData.append('input_currency', "XRP_TEST");
        formData.append('merchant_urlko', 'https://example.com/failure'); 
        formData.append('merchant_urlok', 'https://example.com/success'); 
        formData.append('merchant_url_standby', 'https://example.com/wait'); 
        formData.append('notes', 'Compra de servicio premium'); 
        formData.append('reference', 'ORD-12345-ABC'); 
        formData.append('fiat', orderData.fiat || 'EUR');
        formData.append('language', 'ES'); 
        formData.append('home_address', 'Calle Falsa 123'); 
        formData.append('address_additional', 'Depto 4B'); 
        formData.append('email_client', 'cliente@example.com'); 
        formData.append('full_name', 'Juan Pérez');
        formData.append('address_number', '123'); 
        formData.append('zip_code', '28013'); 
        formData.append('city', 'Madrid'); 
        formData.append('province', 'Madrid'); 
        formData.append('country', 'ES');
        formData.append('phone_number', '+34912345678'); 
        formData.append('nif', '12345678Z'); 
        formData.append('internal_data', 'Datos internos del comerciante para la orden 123'); 
    
     
  
      // Realizar la solicitud POST
      const response = await axios.post(`${API_URL}/orders/`, formData, {
        headers: {
            'X-Device-Id': '2e178da6-ee05-458d-b72d-dee96b3d2663', 
            'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:',error ,error.response?.status, error.response?.data);
    }
  };