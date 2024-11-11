import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Share, SafeAreaView, StyleSheet, FlatList, Linking, Alert, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import Wallet from 'react-native-vector-icons/MaterialCommunityIcons';
import ArrowLeft from 'react-native-vector-icons/EvilIcons';
import IconDown from 'react-native-vector-icons/Entypo';

import { useWebSocket } from '../contexts/WebSocketContext';
import SuccessModal from '../components/SuccessModal';
import { getCountries } from '../../RootApi';
import SendModal from '../components/SendModal';

const PaymentRequest = ({ route, navigation }) => {
  const { data, amount } = route.params;
  const [modalSuccess, setModalSuccess] = useState(false)
  const [modalSend,setModalSend] = useState(false)
  const [showCountry, setShowCountry] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { dataEvent, createWebSocketConnection, removeListeners, closeConnection } = useWebSocket();  // Accedemos a la conexión y funciones del contexto
  const [showInput, setShowInput] = useState(false);
  const [countries, setCountries] = useState("")
  const [selectedCountry, setSelectedCountry] = useState({ "code": "+34", "flag": "https://flagcdn.com/w320/es.png", "id": 114, "name": "Spain" })
  const [phoneNumber, setPhoneNumber] = useState("")

  const toggleModalSuceess = () => {
    setModalSuccess(false);
    removeListeners()
    navigation.navigate("CreatePayment")
  };

  const toggleModalSend =()=>{
    setModalSend(false)
  }

  const newRequest = () => {
    removeListeners()
    navigation.navigate("CreatePayment")
  }

  useEffect(() => {
    if (data?.identifier) {
      // Crear la conexión WebSocket solo si el identificador cambia
      createWebSocketConnection(data.identifier);
    }

    // Limpiar la conexión cuando el componente se desmonte o cuando el identificador cambie
    return () => {
      closeConnection();
    };
  }, [data?.identifier]);  // Solo depende de 'data?.identifier'


  useEffect(() => {
    console.log("entras", dataEvent)
    if (dataEvent) {

      handleSocketMessage(dataEvent)
    }
  }, [dataEvent])


  const handleSocketMessage = (dataEvent) => {
    switch (dataEvent.status) {
      case 'CO':
        setModalSuccess(true)
        break;
      case 'CA':
        Alert.alert('Pago cancelado', 'Genere una nueva solicitud');
        break;
      default:
        Alert.alert('Pago fallido', 'Hubo un problema con tu pago. Inténtalo de nuevo.');
    }

  };

  const handleShareWApp = () => {

  }

  const handleCountries = async () => {
    const dataCountries = await getCountries()
    setCountries(dataCountries)
    setShowCountry(true)
  }


  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountry(false)
  }





  const handleShare = async (method) => {
    try {
      switch (method) {
        case 'whatsapp':
          await Linking.openURL(`whatsapp://send?text=${data.web_url}`);
          break;
        case 'email':
          await Linking.openURL(`mailto:?subject=Solicitud de pago&body=${data.web_url}`);
          break;
        case 'general':
      
          await Share.share({
            message: data.web_url,
            url: data.web_url,
          });
       
         break;
      }
    } catch (error) {
      //console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await Share.share({
        message: data.web_url,
        url: data.web_url,
      });
    } catch (error) {
      //console.error('Error copying link:', error);
    }
  };

  const handleQR = () => {
    navigation.navigate("QRPayment", { url: data.web_url })

  }

  const handleSendWp =()=>{
    setModalSend(true)
    if (phoneNumber) {
      const url = `https://wa.me/${selectedCountry.code}${phoneNumber}?text=${encodeURIComponent(data.web_url)}`;
      Linking.openURL(url);
    } else {
      alert("Por favor ingresa un número de teléfono válido.");
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {/* <Mail name={'email'} size={24} color="#3B82F6" />  */}
        </View>
        <Text style={styles.title}>Solicitud de pago</Text>
        <Text style={styles.amount}>{amount/*.toFixed(2)*/} €</Text>
        <Text style={styles.subtitle}>Comparte el enlace de pago con el cliente</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => handleQR()}>
          <Icon name={'link'} size={24} color="#035AC5" />

          <Text style={styles.optionText}> {data.web_url}</Text>
          <View style={styles.copyButton}>
            <Icon name={'qrcode'} size={24} color="#035AC5" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleShare('email')}>
          <Icon name={'email'} size={24} color="#035AC5" />

          <Text style={styles.optionText}> Enviar por correo electrónico</Text>
        </TouchableOpacity>
        {!showInput ? (
          <TouchableOpacity style={styles.option} onPress={() => (setShowInput(true))}>
            <Icon name={'whatsapp'} size={24} color="#035AC5" />
            <Text style={styles.optionText}> Enviar a número de WhatsApp </Text>

          </TouchableOpacity>)
          : (
            <TouchableOpacity style={styles.optionInput} onPress={() => handleCountries()}>
              <Icon name={'whatsapp'} size={24} color="#035AC5" />
              <Text style={styles.optionTextInput}> {selectedCountry.code} <IconDown name="chevron-small-down" size={24} color="#003366" /></Text>
              <TextInput
                style={styles.inputText}
                placeholder="Número de celular"
                placeholderTextColor="#ccc"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TouchableOpacity style={styles.sendButton } onPress={()=>handleSendWp()}>
                <Text style={styles.textSendButton }>Enviar</Text>
              </TouchableOpacity>

            </TouchableOpacity>


          )}


        <TouchableOpacity style={styles.option} onPress={() => handleShare('general')}>
          <Icon name={'share-a'} size={24} color="#035AC5" />
          <Text style={styles.optionText}> Compartir con otras aplicaciones</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.containerNewRequest}>

        <TouchableOpacity style={styles.newRequest} onPress={() => newRequest()}>
          <Text style={styles.newRequestText}>Nueva solicitud <Wallet name='wallet-plus-outline' size={16} color="#3B82F6" /> </Text>

        </TouchableOpacity>
      </View>

      {/* Modal pago realizado con exito    */}
      <SuccessModal visible={modalSuccess} onClose={toggleModalSuceess} />
      {/* Modal pago realizado con exito    */}


      {/* Modal para elegir el pais del celular */}
      <Modal
        animationType="slide"
        visible={showCountry}
        presentationStyle="fullScreen"
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <View style={{ padding: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <TouchableOpacity
                onPress={() => setShowCountry(false)}
                style={{ padding: 8, marginRight: 16 }}
              >
                <ArrowLeft name={"arrow-left"} size={35} color="#002859" />
              </TouchableOpacity>
              <Text style={{ fontSize: 18, fontWeight: '700', color: '#002859' }}>
                Seleccionar país
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F5F5F5',
                borderRadius: 8,
                padding: 12,
                marginBottom: 16,
              }}
            >
              {/* <Search size={20} color="#666" style={{ marginRight: 8 }} /> */}
              <TextInput
                placeholder="Buscar"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ flex: 1, fontSize: 16 }}
              />
            </View>

            <FlatList
              data={countries ? countries.filter(country =>
                country.name.toLowerCase().includes(searchQuery.toLowerCase())
              ) : []}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleCountrySelect(item)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F0F0F0',
                  }}
                >
                  {console.log("item", item)}
                  <View style={styles.countryInfo}>
                    <Image
                      source={{ uri: item.flag }}
                      style={styles.countryIcon}
                      resizeMode="contain"
                    />
                    <View style={styles.countryTextContainer}>
                      <Text style={styles.countryName}>{item.code}</Text>
                      <Text style={styles.countrySymbol}>{item.name}</Text>
                    </View>
                  </View>
                  {selectedCountry.id === item.id && (
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
      
      {/*Modal enviado por whatsapp*/}
      <SendModal  visible={modalSend} onClose={toggleModalSend} />
     




    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    backgroundColor: '#EBF5FF',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  optionsContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    color: '#374151'
  },
  optionInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',

  },
  optionTextInput: {
    flex: 0.7,
    fontSize: 14,
    color: '#374151',
    marginLeft:5
  },
  inputText: {
    flex: 1.8,
    fontSize: 14, // Match the optionText font size
    color: '#374151', // Match the optionText color
  },
  sendButton: {    
      marginLeft: 4,
      padding: 4,
      borderRadius: 8,
      alignItems: 'center',    
      backgroundColor:"#035AC5"    
  },
  textSendButton:{
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 8,
  },
  containerNewRequest: {
    flex: 0.8,
    justifyContent: 'flex-end',

  },
  newRequest: {
    alignItems: 'center',
    width: '95%',
    backgroundColor: '#D3DCE6',
    paddingVertical: 16,
    borderRadius: 8,
  },
  newRequestText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  countryIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  countryTextContainer: {
    flex: 1,
  },
  countryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  countrySymbol: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  }

});



export default PaymentRequest;
