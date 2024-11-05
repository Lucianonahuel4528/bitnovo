// CurrencySelector.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';   
//import {getCurrencies} from '../../Api.js';
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
    console.log("response",response)
    return response.data;
};


const CurrencySelector = () => {
    const [currencies, setCurrencies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchCurrencies = async () => {
        try {
          const data = await getCurrencies();
          setCurrencies(data.currencies);
        } catch (error) {
          console.error('Error fetching currencies:', error);
          setError('Error fetching currencies. Please try again later.');
        }
      };
  
      fetchCurrencies();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={{ padding: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Ionicons name={item.icon} size={24} color="black" /> */}
                    <Text style={{ marginLeft: 10 }}>{item.name}</Text>
                    <Text style={{ marginLeft: 10 }}>{item.code}</Text>
                    <Ionicons name="chevron-forward" size={20} color="black" />
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={currencies}
                renderItem={renderItem}
                keyExtractor={(item) => item.code}
            />
        </View>
    );
};

export default CurrencySelector;
