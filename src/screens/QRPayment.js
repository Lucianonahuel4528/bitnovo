import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import ArrowLeft from 'react-native-vector-icons/EvilIcons'; 
import Info from 'react-native-vector-icons/MaterialIcons';
import SuccessModal from '../components/SuccessModal';
import { useWebSocket } from '../contexts/WebSocketContext';

const QRPayment =({route,navigation} )=> {
  const {url} =route.params;
  const [modalSuccess,setModalSuccess] = useState(false)


  const { dataEvent,removeListeners } = useWebSocket();  // Accedemos a la conexión y funciones del contexto

  const toggleModalSuceess = () => {
    console.log("togleas?")
    setModalSuccess(false);
    removeListeners()
    navigation.navigate("CreatePayment")
  };

  useEffect(()=>{
    console.log("entras",dataEvent)
    if(dataEvent) {

      handleSocketMessage(dataEvent)
    }
  },[dataEvent])


  const handleSocketMessage = (dataEvent) => {
    // Manejo de diferentes tipos de mensajes
    console.log("data status",dataEvent.status)
    switch (dataEvent.status) {
      case 'CO':
        setModalSuccess(true)
        break;
      case 'CA':
        Alert.alert('Pago cancelado','Genere una nueva solicitud');
        break;
      default:
        Alert.alert('Pago fallido', 'Hubo un problema con tu pago. Inténtalo de nuevo.');
        console.log('Mensaje desconocido:', dataEvent);
    }
    
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>{navigation.goBack()}} style={styles.backButton}>
           <ArrowLeft name={"arrow-left"} size={35} color="#002859" /> 
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.infoBox}>
          <Info name='info' size={20} color="#1A73E8" /> 
          <Text style={styles.infoText}>
            Escanea el QR y serás redirigido a la pasarela de pago de Bitnovo Pay
          </Text>
        </View>

        <View style={styles.qrContainer}>
          <QRCode
            value={url}
            size={250}
            backgroundColor="white"
            color="#000"
          />
          {/* <Image
            source={require('../../assets/bitnovo-pay-logo.png')}
            style={styles.qrLogo}
          /> */}
        </View>

        {/* <Text style={styles.amount}>
          {amount.toFixed(2).replace('.', ',')} €
        </Text> */}

        <Text style={styles.updateText}>
          Esta pantalla se actualizará automáticamente
        </Text>

      </View>

      {/* Modal pago realizado con exito    */}
        <SuccessModal visible={modalSuccess} onClose={toggleModalSuceess} />
      {/* Modal pago realizado con exito    */}
    

   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035AC5',
  },
  header: {
    backgroundColor: 'white',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    margin:5,
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 40,
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    color: '#1A73E8',
    fontSize: 14,
    lineHeight: 20,
  },
  qrContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 24,
  },
  qrLogo: {
    position: 'absolute',
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  amount: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  updateText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
});

export default QRPayment;