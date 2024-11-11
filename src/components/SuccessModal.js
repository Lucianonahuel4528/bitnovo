// SuccessModal.js
import React from 'react';
import { Modal, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SuccessModal = ({ visible, onClose }) => {
  return (
    <Modal animationType="slide" visible={visible} presentationStyle="fullScreen">
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Image source={require('../../src/images/bitnovo-logo.png')} style={styles.logo} />
          <View style={styles.divider} />

          <View style={styles.successContainer}>
            <Image source={require('../../src/images/success-icon.png')} style={styles.successIcon} />
            <Text style={styles.successText}>Pago recibido</Text>
            <Text style={styles.successSubtext}>El pago se ha confirmado con éxito</Text>
          </View>
          
          <TouchableOpacity onPress={onClose} style={styles.finishButton}>
            <Text style={styles.finishText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Define aquí tus estilos
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
    backgroundColor: '#D3DCE6',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishText: {
    color: '#035AC5',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SuccessModal;
