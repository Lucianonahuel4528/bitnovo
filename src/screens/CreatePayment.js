import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity,TextInput,StyleSheet, SafeAreaView,StatusBar,FlatList,KeyboardType,Image,Modal, ActivityIndicator } from 'react-native'
import { createOrder,getCurrencies } from '../../RootApi.js';
import IconDown from 'react-native-vector-icons/Entypo'; 
import ArrowLeft from 'react-native-vector-icons/EvilIcons'; 
import Search from 'react-native-vector-icons/AntDesign'


const CreatePayment =({route,navigation} )=> {
  const [amount, setAmount] = useState('0.00')
  const [description, setDescription] = useState('')
  const [isAmountFocused, setIsAmountFocused] = useState(true)
  const [showCurrencyModal, setShowCurrencyModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false); 

  const currencies = [
    {
      id: 'eur',
      name: 'Euro',
      subname: 'EUR',
      symbol:"€",
      image: require('../../src/images/euro.png')  
    },
    {
      id: 'usd',
      name: 'Dólar Estadounidense',
      subname: 'USD',
      symbol: '$',
      image: require('../../src/images/dolar.png')  },
      {
        id: 'gbp',
      name: 'Libra Esterlina',
      subname: 'GBP',
      symbol: '£',
      image: require('../../src/images/libra.png')  },
    ]
    const [selectedCurrency, setSelectedCurrency] = useState(currencies[1]) // USD by default
    const filteredCurrencies = currencies.filter(currency => 
      currency.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
    

  const handleCurrencySelect = (currency) => {
    setSelectedCurrency(currency)
    setShowCurrencyModal(false)
  }
  
  const amountRef = useRef(null)
  const descriptionRef = useRef(null)

  const handleAmountChange = (text) => {
    // Elimina caracteres no numéricos
    const numericValue = text.replace(/[^0-9]/g, '');
  
    // Verifica que numericValue tenga algún valor, de lo contrario usa 0
    const decimal = numericValue ? (parseInt(numericValue) / 100).toFixed(2) : "0.00";
    
    console.log("decimal", decimal);
    setAmount(decimal);
  };

  const handleContinuePay = async () => {
    
     const orderData = {
      expected_output_amount:amount,
      //fiat:currency.subname
     }
     setIsLoading(true); // Activa la carga al iniciar

  
       try {
         const response = await createOrder(orderData); 
          console.log('Order response:', response);
         
       navigation.navigate('PaymentRequest', { data: response , amount });
        
     } catch (error) {
         console.error('Error al crear la orden:', error);
       } finally {
        setIsLoading(false)
       }
    
  
  }

  return (
    <SafeAreaView style={styles.container}>
       {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{amount > "0.00" ?   "Importe a pagar" :"Crear pago" }</Text>
        <TouchableOpacity style={styles.currencySelector} 
        onPress={() => setShowCurrencyModal(true)}>
          <Text style={styles.currencyText}>{ selectedCurrency.subname}</Text>
                      <IconDown name="chevron-small-down" size={24} color="#003366" /> 
        </TouchableOpacity>
      </View>
     
      <View style={styles.amountContainer}>

        <TextInput
          ref={amountRef}
          style={styles.amountInput}
          value={`${amount}${selectedCurrency.symbol}`}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          onFocus={() => setIsAmountFocused(true)}
          selectTextOnFocus
        />
      </View>

      <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>Concepto</Text>
          <TextInput
            ref={descriptionRef}
            style={styles.descriptionInput}
            placeholder="Añade descripción del pago"
            placeholderTextColor="#A0A0A0"
            value={description}
            onChangeText={setDescription}
            onFocus={() => setIsAmountFocused(false)}
            multiline
          />
          <Text style={styles.characterCount}>{description.length}/140 caracteres</Text>
        </View>

      <TouchableOpacity 
        style={[
          styles.continueButton,
          (amount > 0 && description) ? styles.continueButtonActive : styles.continueButtonInactive
        ]}
        onPress={handleContinuePay}
        disabled={!(amount > 0 && description)}
      >
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>


    <Modal
      animationType="slide"
      visible={showCurrencyModal}
      presentationStyle="fullScreen"
      >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar barStyle="dark-content" />
        <View style={{ padding: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => setShowCurrencyModal(false)}
              style={{ padding: 8, marginRight: 16 }}
            >
            <ArrowLeft name={"arrow-left"} size={35} color="#002859" /> 
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#002859' }}>
              Selecciona una divisa
            </Text>
          </View>
          
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              borderWidth: 1,  
              borderColor: '#E5E9F2',  

            }}
          >
             <Search name={"search1"} size={20} color="#666" style={{ marginRight: 8 }} /> 
            <TextInput
              placeholder="Buscar"
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{ flex: 1, fontSize: 16 }}
            />
          </View>

          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleCurrencySelect(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#F0F0F0',
                }}
              >
                <View style={styles.cryptoInfo}>
                    <Image
                    source={ item.image }
                    style={styles.cryptoIcon}
                            resizeMode="contain"
                          />
                          <View style={styles.cryptoTextContainer}>
                            <Text style={styles.cryptoName}>{item.name}</Text>
                            <Text style={styles.cryptoSymbol}>{item.subname}</Text>
                          </View>
                  </View>
                {selectedCurrency.id === item.id && (
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      backgroundColor: '#007AFF',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                )}
              </TouchableOpacity>
            )}
          />
        </View>
      </SafeAreaView>
    </Modal>
  
    </SafeAreaView>
            

)

  
  
    


}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
      fontSize: 18,
    fontWeight: '600',
    color: '#002859',
    marginLeft:100
      },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F5F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  currencyText: {
    color: '#003366',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
  amountContainer: {
    paddingVertical: 32,
    alignItems: 'center',
  },
  amountInput: {
    fontSize: 48,
    fontWeight: '600',
    color: '#0066CC',
    textAlign: 'center',
  },
  descriptionContainer: {
    padding: 16,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  descriptionInput: {
    fontSize: 16,
    color: '#1A1A1A',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    minHeight: 48,
  },
  continueButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#035AC5',
  },
  continueButtonInactive: {
    backgroundColor: '#E5E5E5',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cryptoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cryptoIcon: {
    width: 50,
    height: 50,
    borderRadius:55,
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
  }
})

export default CreatePayment;
