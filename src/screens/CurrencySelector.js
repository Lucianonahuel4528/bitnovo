// CurrencySelector.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar, Image, StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';   
import {getCurrencies} from '../../RootApi.js';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
const CurrencySelector = ({navigation}) => {
    const [currencies, setCurrencies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [error, setError] = useState(null);
    // Función para manejar la llamada a la API
    
    const fetchCurrencies = async () => {
        try {
            const data = await getCurrencies(); // Llama a la función getCurrencies
            setCurrencies(data); // Actualiza el estado con los datos obtenidos
        } catch (error) {
            console.error('Error fetching currencies:', error);
        }
    };

    // Llama a fetchCurrencies cuando el componente se monte
    useEffect(() => {
        fetchCurrencies(); 
    }, []);

    const filteredCurrencies = currencies.filter(currency =>
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      currency.blockchain.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const handlePress = (item) => {
      navigation.navigate('Import',{currency:item})
    };


    const renderItem = ({ item }) => {
      console.log("item",item)
        return (
            <TouchableOpacity onPress={()=>handlePress(item)} style={{ padding: 10 }}>
                 <View style={styles.cryptoInfo}>
        <Image
          source={{ uri: item.image }}
          style={styles.cryptoIcon}
          resizeMode="contain"
        />
        <View style={styles.cryptoTextContainer}>
          <Text style={styles.cryptoName}>{item.name}</Text>
          <Text style={styles.cryptoSymbol}>{item.symbol}</Text>
        </View>
      </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton}>
            <Text style={styles.headerTitle}>Selecciona una divisa</Text>

              <Ionicons name="arrow-back-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
    
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#666"
            />
          </View>
    
          {/* Crypto List */}
          <FlatList
            data={filteredCurrencies}
            renderItem={renderItem}
            keyExtractor={item => item.blockchain}
            style={styles.cryptoList}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      );

};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    backButton: {
      marginRight: 8,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 16,
      marginVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      height: 40,
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    cryptoList: {
      paddingHorizontal: 16,
    },
    cryptoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#f0f0f0',
    },
    cryptoInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    cryptoIcon: {
      width: 36,
      height: 36,
      marginRight: 12,
    },
    cryptoTextContainer: {
      flex: 1,
    },
    cryptoName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
    },
    cryptoSymbol: {
      fontSize: 14,
      color: '#666',
      marginTop: 2,
    },
    selectedDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#2196F3',
    },
  });
export default CurrencySelector;
