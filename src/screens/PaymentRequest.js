import React,{useEffect,useState} from 'react';
import { View, Text, TouchableOpacity, Share,SafeAreaView, StyleSheet, Linking,Alert,Image,Modal } from 'react-native';
// import { Mail, Share2, WhatsApp } from "lucide-react-native";
import Icon from 'react-native-vector-icons/Fontisto'
import Navigation from '../../Navigation';

const PaymentRequest =({route,navigation} )=> {
    const {data,amount} = route.params;
    console.log("data",data.identifier)
    const [paymentUrl, setPaymentUrl] = useState('');
    const [socket, setSocket] = useState(null);
    const [statusMessage, setStatusMessage] = useState('');
    const [modalSuccess,setModalSuccess] = useState(false)
 
    const toggleModalSuceess = () => {
      navigation.navigate("CreatePayment")
      setModalSuccess(false);
    };

    /* Se crea un websocket el cual se puede
    escuchar para recibir notificaciones de cambio de estado*/ 
    useEffect(() => {
      if (data.identifier) {
        const newSocket = new WebSocket(`wss://payments.pre-bnvo.com/ws/merchant/${data.identifier}`);

        newSocket.onopen = () => {
          console.log('Conexión WebSocket abierta');
          setStatusMessage('Conexión establecida');
        };

      //   // Simulación de mensajes entrantes (reemplaza con tu lógica real)
      // const simulateMessage = () => {
      //   setTimeout(() => {
      //     const simulatedData = {
      //       // Ejemplo de datos del mensaje
      //       status: 'pending', // Estado del pago (pendiente, completado, etc.)
      //       message: 'Simulating message from server',
      //     };
      //     newSocket.onmessage({ data: JSON.stringify(simulatedData) });
      //      simulateMessage(); // Descomenta para simular mensajes continuos
      //   }, 8000); // Simula un mensaje cada 2 segundos
      // };

        newSocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          console.log("data onmessage",data)
          handleSocketMessage(data);
        };

        newSocket.onerror = (error) => {
          console.error('Error en WebSocket:', error);
          setStatusMessage('Error en la conexión');
        };

        newSocket.onclose = () => {
          console.log('Conexión WebSocket cerrada');
          setStatusMessage('Conexión cerrada');
        };

        setSocket(newSocket);
        //simulateMessage(); // Inicia la simulación de mensajes

        return () => {
          newSocket.close();
        };
      }
    }, [data.identifier]);

    const handleSocketMessage = (data) => {
      // Manejo de diferentes tipos de mensajes
      console.log("data status",data.status)
      switch (data.status) {
        case 'payment_received':
          Alert.alert('Pago recibido', 'Tu pago ha sido recibido con éxito.');
          break;
        case 'CA':
          //Alert.alert('Pago fallido', 'Hubo un problema con tu pago. Inténtalo de nuevo.');
          setModalSuccess(true)
          break;
        default:
          console.log('Mensaje desconocido:', data);
      }
      
    };
    /*Fin websocket*/

  
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
      console.error('Error sharing:', error);
    }
  };

  const handleCopyLink = async () => {
    try {
      await Share.share({
        message: data.web_url,
        url: data.web_url,
      });
    } catch (error) {
      console.error('Error copying link:', error);
    }
  };

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

        <TouchableOpacity style={styles.option} onPress={handleCopyLink}>
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

        <TouchableOpacity style={styles.option} onPress={() => handleShare('whatsapp')}>
        <Icon name={'whatsapp'} size={24} color="#035AC5" /> 

          <Text style={styles.optionText}> Enviar a número de WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleShare('general')}>
        <Icon name={'share-a'} size={24} color="#035AC5" /> 
          <Text style={styles.optionText}> Compartir con otras aplicaciones</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.newRequest}>
        <Text style={styles.newRequestText}>Nueva solicitud</Text>
        {/* <Mail size={16} color="#3B82F6" /> */}
      </TouchableOpacity>


          
        {/* Modal CurrencySelector     */}

 <Modal 
 animationType="slide" 
 visible={modalSuccess} 
 presentationStyle="fullScreen" >
 <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image source={require('../../src/images/bitnovo-logo.png')} style={styles.logo} />
            <View style={styles.divider} />

            <View style={styles.successContainer}>
              <Image source={require('../../src/images/success-icon.png')} style={styles.successIcon} />
              <Text style={styles.successText}>Pago recibido</Text>
              <Text style={styles.successSubtext}>El pago se ha confirmado con éxito</Text>
            </View>
            <TouchableOpacity onPress={()=>toggleModalSuceess()} style={styles.finishButton}>
              <Text style={styles.finishText}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        </View>

 </Modal>



    

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
    color: '#374151',
  },
  copyButton: {
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 8,
  },
  newRequest: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
    paddingVertical: 16,
  },
  newRequestText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '500',
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  modalView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  divider: {
    width: '100%',
    height: 2,
    backgroundColor: '#E5E7EB',
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    backgroundColor: '#E8F5E9',
    borderRadius: 40,
    padding: 20,
    marginBottom: 24,
  },
  successText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  finishButton: {
    width: '100%',
    backgroundColor: '#1A73E8',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentRequest;
