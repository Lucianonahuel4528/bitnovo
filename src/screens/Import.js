import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Platform } from 'react-native'
//import { ChevronDown, Delete } from 'lucide-react-native'


const Import =({route} )=> {
  const [amount, setAmount] = useState('0.00')
  const [description, setDescription] = useState('')
  const {currency }=route.params
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Importe a pagar</Text>
        <TouchableOpacity style={styles.currencySelector}>
          {/* <Text style={styles.currencyText}>{currency}</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{amount} {currency.symbol}</Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionLabel}>Concepto</Text>
        <Text style={styles.descriptionPlaceholder}>
          Añade descripción del pago
        </Text>
      </View>

      <TouchableOpacity style={styles.continueButton}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>

     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  currencySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  currencyText: {
    fontSize: 17,
    color: '#007AFF',
  },
  amountContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  amount: {
    fontSize: 48,
    fontWeight: '200',
    color: '#000',
  },
  descriptionContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  descriptionLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  descriptionPlaceholder: {
    fontSize: 17,
    color: '#8E8E93',
  },
  continueButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#007AFF15',
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 17,
    color: '#007AFF',
  }
  
 
})

export default Import;
