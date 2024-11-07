import React, { useState, useRef } from 'react'
import { View, Text, TouchableOpacity,TextInput,StyleSheet, SafeAreaView, Platform,KeyboardType } from 'react-native'
import { createOrder,getCurrencies } from '../../RootApi.js'; // Asegúrate de que la ruta sea correcta para tu proyecto

//import { ChevronDown, Delete } from 'lucide-react-native'


const Import =({route,navigation} )=> {
  const [amount, setAmount] = useState('0.00')
  const [description, setDescription] = useState('')
  const [isAmountFocused, setIsAmountFocused] = useState(true)
  const { currency } = route.params
  console.log("currency ======>>>>>>",currency)
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
    // Add your continue logic here
    console.log('Amount:', amount, 'Description:', description , "currency",currency)
 
     const orderData = {
      expected_output_amount:amount,
      fiat:currency.subname
     }
  
       try {
         const response = await createOrder(orderData); // Llamada a la API
          console.log('Order response:', response);
         //const currencies= await getCurrencies()
       // Navegación a la siguiente pantalla pasando la respuesta de la API
       navigation.navigate('PaymentRequest', { data: response , amount });
        
     } catch (error) {
         console.error('Error al crear la orden:', error);
       }
    
  
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Importe a pagar</Text>
        {/*Si alcanza tiempo aca va la logica de cambio de moneda  
        <TouchableOpacity style={styles.currencySelector}>
          <Text style={styles.currencyText}>{currency?.code || 'EUR'}</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.amountContainer}>

        <TextInput
          ref={amountRef}
          style={styles.amountInput}
          value={`${amount}${currency?.symbol}`}
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  currencySelector: {
    padding: 8,
  },
  currencyText: {
    color: '#0066CC',
    fontSize: 16,
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
    backgroundColor: '#0066CC',
  },
  continueButtonInactive: {
    backgroundColor: '#E5E5E5',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Import;
