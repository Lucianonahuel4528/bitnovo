import React from 'react';
import { View, Text, TouchableOpacity, Share, StyleSheet, Linking } from 'react-native';
import { Mail, Share2, WhatsApp } from "lucide-react-native";


const PaymentRequest =({route} )=> {
    const {data,amount} = route.params;
    console.log("dataa ===>>>",data)
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Mail size={24} color="#3B82F6" /> 
        </View>
        <Text style={styles.title}>Solicitud de pago</Text>
        <Text style={styles.amount}>{amount/*.toFixed(2)*/} €</Text> 
        <Text style={styles.subtitle}>Comparte el enlace de pago con el cliente</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={handleCopyLink}>
          {/* <Text style={styles.optionText}>{data.web_url}</Text> */}
          <View style={styles.copyButton}>
            {/* <Share2 size={20} color="#FFFFFF" /> */}
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleShare('email')}>
          <Text style={styles.optionText}>Enviar por correo electrónico</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleShare('whatsapp')}>
          <Text style={styles.optionText}>Enviar a número de WhatsApp</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => handleShare('general')}>
          <Text style={styles.optionText}>Compartir con otras aplicaciones</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.newRequest}>
        <Text style={styles.newRequestText}>Nueva solicitud</Text>
        {/* <Mail size={16} color="#3B82F6" /> */}
      </TouchableOpacity>
    </View>
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
});

export default PaymentRequest;
